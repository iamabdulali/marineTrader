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
    "Motor/Yacht": ["Motor/Yacht1", "Motor/Yacht2", "Motor/Yacht3"],
    Sailboat: ["Sailboat1", "Sailboat2", "Sailboat3"],
    Smallcraft: ["Smallcraft1", "Smallcraft2", "Smallcraft3"],
    Fishing: ["Fishing1", "Fishing2", "Fishing3"],
    Rib: ["Rib1", "Rib2", "Rib3"],
    "Non-Motor": ["Non-Motor1", "Non-Motor2", "Non-Motor3"],
    Commercial: ["Commercial1", "Commercial2", "Commercial3"],
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
      <Form className="bg-white shadow-md rounded-lg sm:px-8 px-4 w-full py-8 mb-4">
        <div className="mb-4">
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
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

          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
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
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
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
          className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-full text-white font-medium py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default CategoryDropdown;
