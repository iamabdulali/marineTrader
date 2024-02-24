import React from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";

const CounterOffer = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg border-t-8 border-[#0D1A8B] p-3">
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
          <FaDollarSign size={22} color="#0D1A8B" />
          <p className="text-[#0D1A8B] font-semibold ml-3">
            Make a Counter Offer
          </p>
        </div>
        <FaTimes
          className="cursor-pointer"
          onClick={onClose}
          color="#696E9D"
          size={24}
        />
      </div>
      <form className="mt-8">
        <label className="text-[#11133D] font-medium mb-2 block">
          Enter Counter Price
        </label>
        <input
          type="number"
          className="border-[#CECED7] rounded-md font-semibold outline-none border-2 py-2 px-3 text-[#11133D] w-full"
        />
        <button className="bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white w-full rounded-lg font-semibold py-3 mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CounterOffer;
