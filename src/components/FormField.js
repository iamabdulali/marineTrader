import { Formik, Form, Field, ErrorMessage } from "formik";

export const FormField = ({ label, name, onClick }) => (
  <div className="mb-4 w-full text-sm">
    <label
      className="block text-[#11133D] text-sm font-medium mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <Field
      type="text"
      name={name}
      onClick={onClick}
      placeholder={label}
      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
    />
    <ErrorMessage component="span" name={name} className="text-[red]" />
  </div>
);
