import { Formik, Form, Field, ErrorMessage } from "formik";

export const FormField = ({
  label,
  name,
  onClick,
  inputField,
  FieldType,
  className,
  value,
  onChange,
  readOnly,
  useLabelAsPlaceHolder,
  placeholder,
  as,
  padding,
  onKeyPress,
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
          as={as}
          onKeyPress={onKeyPress}
          type={FieldType}
          name={name}
          value={value}
          onChange={onChange}
          onClick={onClick}
          placeholder={useLabelAsPlaceHolder ? label : placeholder}
          className={className}
          readOnly={readOnly}
        ></Field>
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
          onChange={onChange}
          onClick={onClick}
          placeholder={label}
          readOnly={readOnly}
          className={`border-b-2 font-semibold outline-none ${
            readOnly ? "border-[#f1f1f1]" : "border-[#000]"
          }  py-2 ${padding ? "px-24" : "px-0"} text-[#11133D] w-full`}
        />
      </div>
    )}
  </div>
);
