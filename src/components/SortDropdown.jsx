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
        <p className="text-sm font-semibold flex items-center gap-2 text-[#696E9D]">
          <img src={sortIcon} className="w-6" />
          Sort By Price:
        </p>
        <span className="text-[#696E9D] text-sm ml-2">
          {selectedOption === "lowToHigh" ? "Low to High" : "High to Low"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          <button
            onClick={() => handleSortOptionClick("lowToHigh")}
            className="block  w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            Low to High
          </button>
          <button
            onClick={() => handleSortOptionClick("highToLow")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
          >
            High to Low
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
