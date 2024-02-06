import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoryDropdownValidationSchema } from "../../utils/ValidationSchema";
import { CategorySelectDropdown } from "../CategorySelectDropdown";

const CategoryDropdown = ({ onSubmit, category }) => {
  const handleSubmit = (values) => {
    // Implement your search logic here using the form values
    onSubmit(values);
  };

  console.log(category);

  const categoryOptions = {
    "Jet Skis": ["Category1", "Category2", "Category3"],
    "Boat Home": ["Boat Home1", "Boat Home2", "Boat Home3"],

    // Add more categories and their background images as needed
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
            <CategorySelectDropdown
              label="Category"
              name="category"
              options={["Category1", "Category2", "Category3"]}
            />
            <CategorySelectDropdown
              label="Make"
              name="make"
              options={categoryOptions[category] || ["Make1", "Make2", "Make3"]}
            />
          </div>

          <div className="flex gap-4">
            <CategorySelectDropdown
              label="Model"
              name="model"
              options={["Model1", "Model2", "Model3"]}
            />
            <CategorySelectDropdown
              label="Type"
              name="type"
              options={["Type1", "Type2", "Type3"]}
            />
          </div>
          <div className="flex gap-4">
            <CategorySelectDropdown
              label="Condition"
              name="condition"
              options={["Condition1", "Condition2", "Condition3"]}
            />
            <CategorySelectDropdown
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
