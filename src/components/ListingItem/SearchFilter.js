import React, { useEffect, useState } from "react";
import SelectDropdown from "../SelectDropdown";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useWindowSize } from "../../Hooks/windowResize";

const SearchFilter = () => {
  const [width] = useWindowSize();
  const [showFilterMenu, setShowFilterMenu] = useState(width > 900);

  useEffect(() => {
    // Update showFilterMenu state when the window width changes
    setShowFilterMenu(width > 900);
  }, [width]);

  const makeOptions = [
    { value: "value", label: "Select" },
    { value: "make1", label: "Make 1" },
    { value: "make2", label: "Make 2" },
    // Add more options as needed
  ];

  const priceOptions = [
    { value: "value", label: "To" },
    { value: "make1", label: "Make 1" },
    { value: "make2", label: "Make 2" },
    // Add more options as needed
  ];

  const priceOptions2 = [
    { value: "value", label: "From" },
    { value: "make1", label: "Make 1" },
    { value: "make2", label: "Make 2" },
    // Add more options as needed
  ];

  return (
    <>
      <div
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        className={`smallLg:hidden border-t-2  cursor-pointer flex items-center justify-between p-4 w-full bg-[#FAFAFA] text-[#11133D] font-semibold ${
          showFilterMenu ? "mb-0 " : "mb-10 border-b-2"
        }`}
      >
        <p>Filter</p>
        {showFilterMenu ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showFilterMenu ? (
        <form
          className={`flex smallLg:flex-row flex-col gap-3 smallLg:items-end w-full border-t-2 border-b-2 py-6 mb-10 `}
        >
          <SelectDropdown options={makeOptions} label="Make" name="Make" />
          <SelectDropdown options={makeOptions} label="Model" name="Model" />
          <SelectDropdown options={makeOptions} label="Type" name="Type" />
          <SelectDropdown
            options={makeOptions}
            label="Condition"
            name="Condition"
          />
          <SelectDropdown options={makeOptions} label="Year" name="Year" />
          <SelectDropdown
            options={priceOptions}
            options2={priceOptions2}
            label="Price"
            name="Price"
          />
          <button className="bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white py-3 px-6 font-medium rounded-lg smallLg:mt-0 mt-4">
            Search
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchFilter;
