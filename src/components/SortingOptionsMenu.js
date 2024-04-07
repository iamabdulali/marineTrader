import React from "react";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const SortingOptionsMenu = ({
  handleSortByDate,
  handleSortByPrice,
  items,
  setItems,
}) => {
  return (
    <div className="absolute z-[100]  bg-white custom-shadow rounded-lg px-2 top-2 py-2 min-w-40 right-0">
      <p
        onClick={() => handleSortByDate(true, items, setItems)}
        className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
      >
        <FaCalendarAlt /> Date Asc
      </p>
      <p
        onClick={() => handleSortByDate(false, items, setItems)}
        className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
      >
        <FaCalendarAlt /> Date Desc
      </p>
      <p
        onClick={() => handleSortByPrice(false, items, setItems)}
        className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
      >
        <FaDollarSign /> Price Highest
      </p>
      <p
        onClick={() => handleSortByPrice(true, items, setItems)}
        className="mt-3 mb-2 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
      >
        <FaDollarSign /> Price Lowest
      </p>
    </div>
  );
};

export default SortingOptionsMenu;
