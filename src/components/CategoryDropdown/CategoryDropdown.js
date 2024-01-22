import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoryDropdownValidationSchema } from "../../utils/ValidationSchema";

const SelectDropdown = ({ label, name, options }) => (
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
      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
    >
      <option value="" label={`Select a ${label.toLowerCase()}`} />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Field>
    <ErrorMessage component="span" name={name} className="text-[red]" />
  </div>
);

const CategoryDropdown = ({ onSubmit }) => {
  const handleSubmit = (values) => {
    // Implement your search logic here using the form values
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        category: "",
        make: "",
        model: "",
        type: "",
        condition: "",
        year: "",
      }}
      validationSchema={categoryDropdownValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="bg-white shadow-md rounded-lg px-8 w-full py-8 mb-4">
        <div className="mb-4">
          <div className="flex gap-4">
            <SelectDropdown
              label="Category"
              name="category"
              options={["Category1", "Category2", "Category3"]}
            />
            <SelectDropdown
              label="Make"
              name="make"
              options={["Make1", "Make2", "Make3"]}
            />
          </div>

          <div className="flex gap-4">
            <SelectDropdown
              label="Model"
              name="model"
              options={["Model1", "Model2", "Model3"]}
            />
            <SelectDropdown
              label="Type"
              name="type"
              options={["Type1", "Type2", "Type3"]}
            />
          </div>
          <div className="flex gap-4">
            <SelectDropdown
              label="Condition"
              name="condition"
              options={["Condition1", "Condition2", "Condition3"]}
            />
            <SelectDropdown
              label="Year"
              name="year"
              options={["Year1", "Year2", "Year3"]}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#0D1A8B] w-full text-white font-medium py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default CategoryDropdown;
