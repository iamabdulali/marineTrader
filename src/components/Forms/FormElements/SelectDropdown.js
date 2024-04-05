import React from "react";
import { Field } from "formik";

const SelectDropdown = ({ name, options, className, value }) => {
  return (
    <Field as="select" name={name} className={className} value={value}>
      <option label={`Select a ${name}`}>Select a {name}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id} label={option.name}>
          {option.name}
        </option>
      ))}
    </Field>
  );
};

export default SelectDropdown;
