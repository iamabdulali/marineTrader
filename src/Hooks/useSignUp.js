import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { displayErrorMessages } from "../utils/displayErrors";
import axios from "axios";
import { SERVER_BASE_URL } from "..";

const useSignUp = () => {
  const NavigateTo = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  const signUp = async (
    url,
    updatedValues = {},
    navigate = "/dashboard",
    refresh
  ) => {
    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/${url}`,
        updatedValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: refresh
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.data });
      if (refresh) {
        dispatch({ type: "REFRESH_STATE", payload: !refresh });
      }
      setSpinner(false);
      setEditing(false);
      NavigateTo(navigate);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return { signUp, spinner, editing, setEditing };
};

export default useSignUp;
