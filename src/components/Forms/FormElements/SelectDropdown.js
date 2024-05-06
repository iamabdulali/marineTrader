import React from "react";
import { Field } from "formik";

const SelectDropdown = ({
  name,
  options,
  className,
  value,
  isCurrencyField,
}) => {
  return (
    <Field as="select" name={name} className={className} value={value}>
      <option label={`Select a ${name}`}>Select a {name}</option>
      {options.map(({ id, name, currency_code }) => {
        return (
          <option
            key={id}
            value={id}
            label={isCurrencyField ? currency_code : name}
          >
            {name}
          </option>
        );
      })}
    </Field>
  );
};

export default SelectDropdown;
