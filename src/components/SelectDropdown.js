// Dropdown.js
import { Field } from "formik";
import React from "react";

const SelectDropdown = ({ label, id, options, options2, name }) => {
  return (
    <div
      className={`flex flex-col ${
        label == "Price" ? "smallLg:w-6/12" : "smallLg:w-3/12"
      }`}
    >
      <label className="text-[#8891B2] mb-2 text-sm">{label}</label>
      {label == "Price" ? (
        <div className="flex items-center gap-3 border-[#C8C8C8] border-2 rounded-lg">
          <Field
            as="select"
            id={id}
            className=" w-full text-sm rounded-lg px-2 py-3 text-[#8891B2]"
            name={name}
          >
            <option>Select a {name}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id} label={option.name}>
                {option.name}
              </option>
            ))}
          </Field>
          <span className="w-[2px] h-7 bg-[#C8C8C8]"></span>
          <Field
            as="select"
            id={id}
            className=" w-full text-sm  rounded-lg px-2 py-3 text-[#8891B2]"
            name={name}
          >
            <option>Select a {name}</option>
            {options2.map((option) => (
              <option key={option.id} value={option.id} label={option.name}>
                {option.name}
              </option>
            ))}
          </Field>
        </div>
      ) : (
        <Field
          as="select"
          id={id}
          className="border-2 text-sm border-[#C8C8C8] rounded-lg px-2 py-3 text-[#8891B2]"
          name={name}
        >
          <option value={""}>Select a {name}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id} label={option.name}>
              {option.name}
            </option>
          ))}
        </Field>
      )}
    </div>
  );
};

export default SelectDropdown;
