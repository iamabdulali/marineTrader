import React from "react";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const SortingOptionsMenu = ({
  handleSortByDate,
  handleSortByPrice,
  handleSortByStatus,
  items,
  setItems,
  setSortType,
  isStatusSorting,
}) => {
  return (
    <>
      {isStatusSorting == "offer" ? (
        <div className="absolute z-[100]  bg-white custom-shadow rounded-lg px-2 top-2 py-2 min-w-40 right-0">
          <p
            onClick={(e) => {
              handleSortByStatus("show all", items, setItems);
              setSortType(e.target.textContent.toLowerCase());
            }}
            className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Show All
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus("pending", items, setItems);
              setSortType(e.target.textContent.toLowerCase());
            }}
            className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Pending
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus("accepted", items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Accepted
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus("rejected", items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaDollarSign /> Rejected
          </p>
        </div>
      ) : isStatusSorting == "selling" ? (
        <div className="absolute z-[100]  bg-white custom-shadow rounded-lg px-2 top-2 py-2 min-w-40 right-0">
          <p
            onClick={(e) => {
              handleSortByStatus("show all", items, setItems);
              setSortType(e.target.textContent.toLowerCase());
            }}
            className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Show All
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus("paid", items, setItems);
              setSortType(e.target.textContent.toLowerCase());
            }}
            className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Active
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus(
                // e.target.textContent.trim().toLowerCase(),
                "draft",
                items,
                setItems
              );
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaCalendarAlt />
            In Draft
          </p>
          <p
            onClick={(e) => {
              handleSortByStatus("expired", items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaDollarSign /> Expired
          </p>
        </div>
      ) : (
        <div className="absolute z-[100]  bg-white custom-shadow rounded-lg px-2 top-2 py-2 min-w-40 right-0">
          <p
            onClick={(e) => {
              handleSortByDate(true, items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 flex items-center gap-4 text-[#11133D] cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Date Asc
          </p>
          <p
            onClick={(e) => {
              handleSortByDate(false, items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaCalendarAlt /> Date Desc
          </p>
          <p
            onClick={(e) => {
              handleSortByPrice(false, items, setItems);
              setSortType(e.target.textContent);
            }}
            className="mt-3 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaDollarSign /> Price Highest
          </p>
          <p
            onClick={(e) => {
              setSortType(e.target.textContent);
              handleSortByPrice(true, items, setItems);
            }}
            className="mt-3 mb-2 text-[#11133D] flex items-center gap-4 cursor-pointer font-medium "
          >
            <FaDollarSign /> Price Lowest
          </p>
        </div>
      )}
    </>
  );
};

export default SortingOptionsMenu;
