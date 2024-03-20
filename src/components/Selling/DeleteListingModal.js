import React, { useContext, useState } from "react";
import { deleteIcon } from "../../assets";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../utils/displayErrors";
import { Oval } from "react-loader-spinner";
import { AuthContext } from "../../Context/AuthContext";

const DeleteListingModal = ({ onClick, id, onDelete }) => {
  const { refresh, dispatch } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const handleDelete = async () => {
    setSpinner(true);
    try {
      const { data } = await axios.delete(`${SERVER_BASE_URL}/advert/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(data.message);
      setSpinner(false);
      onDelete(id);
      onClick();
    } catch (error) {
      console.log(error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return (
    <div className="rounded-lg sd">
      <img className="w-28 mx-auto" src={deleteIcon} />
      <p className="text-[#FC4040] font-semibold my-3 text-center">
        Delete Listing
      </p>
      <p className="text-[#8891B2] w-2/3 mx-auto text-center">
        Are you sure to delete this selected listing?{" "}
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onClick}
          className="rounded-lg text-white bg-[#8891B2] hover:bg-[#a3aac4] py-3 w-full"
        >
          No
        </button>
        <button
          onClick={handleDelete}
          className="rounded-lg text-white bg-[#FC4040] hover:bg-[#ff2626] py-3 w-full"
        >
          {" "}
          {spinner ? (
            <Oval
              secondaryColor="#fff"
              color="#fff"
              width={20}
              height={20}
              wrapperClass="justify-center"
            />
          ) : (
            "Yes"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteListingModal;
