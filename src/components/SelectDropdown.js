// Dropdown.js
import React from "react";

const SelectDropdown = ({ label, id, options, options2, name }) => {
  return (
    <div className={`flex flex-col ${label == "Price" ? "w-6/12" : "w-3/12"}`}>
      <label className="text-[#8891B2] mb-2 text-sm" htmlFor={id}>
        {label}
      </label>
      {label == "Price" ? (
        <div className="flex items-center gap-3 border-[#C8C8C8] border-2 rounded-lg">
          <select
            id={id}
            className=" w-full text-sm rounded-lg px-2 py-3 text-[#8891B2]"
            name={name}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="w-[2px] h-7 bg-[#C8C8C8]"></span>
          <select
            id={id}
            className=" w-full text-sm  rounded-lg px-2 py-3 text-[#8891B2]"
            name={name}
          >
            {options2.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <select
          id={id}
          className="border-2 text-sm border-[#C8C8C8] rounded-lg px-2 py-3 text-[#8891B2]"
          name={name}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectDropdown;
