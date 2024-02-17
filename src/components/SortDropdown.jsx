import React, { useState } from "react";
import { sortIcon } from "../assets";

const SortDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("lowToHigh");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSortOptionClick = (option) => {
    setSelectedOption(option);
    // You can perform additional sorting logic or trigger sorting functionality here
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-white py-2 px-3 rounded-md"
      >
        <p className="text-sm  font-semibold flex items-center gap-2 text-[#696E9D]">
          <img src={sortIcon} className="w-6" />
          <span className="hidden sm:block"> Sort By:</span>
        </p>
        <span className="text-[#696E9D] text-sm ml-2">
          {selectedOption === "lowToHigh"
            ? "Expiry Date Asc"
            : "Expiry Date Desc"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          <button
            onClick={() => handleSortOptionClick("lowToHigh")}
            className="block  w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            Expiry Date Asc
          </button>
          <button
            onClick={() => handleSortOptionClick("highToLow")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            Expiry Date Desc
          </button>
          <button
            onClick={() => handleSortOptionClick("lowToHigh")}
            className="block  w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            Price Asc
          </button>
          <button
            onClick={() => handleSortOptionClick("highToLow")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            Price Desc
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
