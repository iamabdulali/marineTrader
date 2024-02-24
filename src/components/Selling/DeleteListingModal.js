import React from "react";
import { deleteIcon } from "../../assets";

const DeleteListingModal = ({ onClick }) => {
  return (
    <div className="rounded-lg">
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
        <button className="rounded-lg text-white bg-[#FC4040] hover:bg-[#ff2626] py-3 w-full">
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteListingModal;
