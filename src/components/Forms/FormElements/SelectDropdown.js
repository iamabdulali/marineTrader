import React from "react";
import { Field } from "formik";

const SelectDropdown = ({ name, options, className }) => {
  return (
    <Field as="select" name={name} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value} label={option.label}>
          {option.label}
        </option>
      ))}
    </Field>
  );
};

export default SelectDropdown;
