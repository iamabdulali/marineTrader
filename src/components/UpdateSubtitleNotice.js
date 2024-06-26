import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { handlePackageUpgrade } from "../utils/handlePackageUpgrade";

const UpdateSubtitleNotice = ({ values, setFieldValue }) => {
  return (
    <>
      <div className="text-sm flex smallLg:flex-row flex-col justify-between text-[#696E9D] border-b-2 pt-1 pb-3 mb-6">
        {" "}
        <div className=" smallLg:order-none order-1">
          <FaInfoCircle size={20} className="mr-2 inline" color="#1CBF73" />
          Upgrade to Premium or Featured if you want to add a Sub Title.
          <button
            type="button"
            onClick={() => handlePackageUpgrade(values, setFieldValue)}
            className="text-[#0D1A8B] font-semibold underline ml-2"
          >
            Upgrade Now
          </button>
        </div>
        {/* <p className="text-right smallLg:mb-0 mb-4">100 Characters</p> */}
      </div>
    </>
  );
};

export default UpdateSubtitleNotice;
