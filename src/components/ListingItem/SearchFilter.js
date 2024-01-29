import React from "react";
import SelectDropdown from "../SelectDropdown";

const SearchFilter = () => {
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
    <form className="flex gap-3 items-end w-full border-t-2 border-b-2 py-6 mb-10">
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
      <button className="bg-[#0D1A8B] text-white py-3 px-6 font-medium rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchFilter;
