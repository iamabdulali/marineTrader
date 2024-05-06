import { Formik, Form, Field, ErrorMessage } from "formik";

export const CategorySelectDropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  addCustomOption,
  valueAsString,
  isCurrencyField,
}) => (
  <div className="mb-4 w-full text-sm">
    <label
      className="block text-[#11133D] text-sm font-medium mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <Field
      as="select"
      name={name}
      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full sm:appearance-auto appearance-none"
      value={value}
      onChange={onChange}
    >
      <option value="" label={`Select a ${label.toLowerCase()}`} />
      {valueAsString
        ? options.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))
        : options.map(({ id, name, currency_code }) => (
            <option key={id} value={id}>
              {isCurrencyField ? currency_code : name}
            </option>
          ))}

      {addCustomOption ? (
        <option value="custom" label={`Select a custom ${name}`} />
      ) : (
        ""
      )}
    </Field>
    <ErrorMessage component="span" name={name} className="text-[red]" />
  </div>
);
