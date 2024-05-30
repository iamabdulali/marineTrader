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
  let updatedValues = {};

  const signUp = async (values, url, sellerType = "trade") => {
    if (sellerType == "trade") {
      Object.assign(updatedValues, {
        ...values,
        service_hours: JSON.stringify(values.service_hours),
      });
    } else {
      updatedValues = {};
    }

    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/${url}`,
        sellerType == "trade" ? updatedValues : values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.data });
      setSpinner(false);
      NavigateTo("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return { signUp, spinner };
};

export default useSignUp;
