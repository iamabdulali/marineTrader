import React from "react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpdateSubtitleNotice = () => {
  return (
    <>
      <div className="text-sm flex justify-between text-[#696E9D] border-b-2 pt-1 pb-3 mb-6">
        {" "}
        <div className="flex items-center">
          <FaInfoCircle size={20} className="mr-2" color="#1CBF73" />
          You can upgrade if you want to write more than 100 characters.
          <Link className="text-[#0D1A8B] font-semibold underline ml-2">
            Upgrade Now
          </Link>
        </div>
        <p>100 Characters</p>
      </div>
    </>
  );
};

export default UpdateSubtitleNotice;
