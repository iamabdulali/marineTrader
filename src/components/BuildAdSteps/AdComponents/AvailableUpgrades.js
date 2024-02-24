import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { diamondImage } from "../../../assets";

const AvailableUpgrades = ({ openModal, className, width }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-5">
        <img src={diamondImage} alt="diamond" className="sm:w-14 w-10" />
        <p className="flex  items-center text-white font-semibold">
          Available Upgrades <FaArrowRight className="ml-5" size={20} />
        </p>
      </div>
      <div className="flex sm:flex-row flex-col items-center gap-5 smallLg:mt-0 mt-6">
        <button
          onClick={openModal}
          type="button"
          className={`bg-[#FFB800] hover:bg-[#edab00] text-[#11133D] font-semibold py-3 rounded-md xl:px-6 px-4 ${width} w-full sm:text-base text-sm`}
        >
          Home Page Spotlight
        </button>
        <button
          onClick={openModal}
          type="button"
          className={`bg-white hover:bg-[#f1f1f1] text-[#11133D] sm:text-base text-sm font-semibold py-3 xl:px-6 px-4 rounded-md ${width} w-full`}
        >
          Category Page Spotlight
        </button>
      </div>
    </div>
  );
};

export default AvailableUpgrades;
