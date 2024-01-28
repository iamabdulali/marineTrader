import { Formik, Form, Field, ErrorMessage } from "formik";

export const FormField = ({
  label,
  name,
  onClick,
  inputField,
  FieldType,
  className,
  value,
}) => (
  <div className="mb-4 w-full text-sm">
    {inputField ? (
      <div>
        <label
          className="block text-[#11133D] text-sm font-medium mb-2"
          htmlFor={name}
        >
          {label}
        </label>{" "}
        <Field
          type={FieldType}
          name={name}
          onClick={onClick}
          placeholder={label}
          className={className}
        />
        <ErrorMessage component="span" name={name} className="text-[red]" />
      </div>
    ) : (
      <div>
        <label
          className="block text-[#8891B2] text-sm font-medium"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={FieldType}
          name={name}
          value={value}
          onClick={onClick}
          placeholder={label}
          className="border-[#f1f1f1] font-semibold outline-none border-b-2 py-2 px-0 text-[#11133D] w-full"
        />
      </div>
    )}
  </div>
);
