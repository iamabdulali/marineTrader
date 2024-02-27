import { Formik, Form, Field, ErrorMessage } from "formik";

export const CategorySelectDropdown = ({ label, name, options, multiple }) => (
  <div className="mb-4 w-full text-sm">
    <label
      className="block text-[#11133D] text-sm font-medium mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <Field
      as="select"
      multiple={multiple}
      name={name}
      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full sm:appearance-auto appearance-none"
    >
      {/* <option value="" label={`Select a ${label.toLowerCase()}`} /> */}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Field>
    <ErrorMessage component="span" name={name} className="text-[red]" />
  </div>
);
