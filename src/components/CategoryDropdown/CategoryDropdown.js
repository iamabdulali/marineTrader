import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoryDropdownValidationSchema } from "../../utils/ValidationSchema";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { yearsArray } from "../../utils/DummyData";
import { AuthContext } from "../../Context/AuthContext";

const CategoryDropdown = ({ onSubmit, category }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const categoryOptions = {
    "Jet Skis": ["Jet Skis"],
    "Boat Home": ["Boat Home"],
    "Motor/Yacht": ["Motor/Yacht"],
    Sailboat: ["Sail Boat"],
    Smallcraft: ["Small Craft"],
    Fishing: ["Fishing"],
    Rib: ["Rib"],
    "Non-Motor": ["Non-Motor"],
    Commercial: ["Commercial"],
  };

  const { selectedCategory, conditions, makes, types, modals } =
    useContext(AuthContext);

  console.log(selectedCategory?.name);

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
      // validationSchema={categoryDropdownValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="bg-white shadow-md rounded-lg sm:px-8 px-4 w-full py-8 mb-4">
        <div className="mb-4">
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
            <div className="w-full text-sm">
              <label
                className="block text-[#11133D] text-sm font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <Field
                as="select"
                label="Category"
                name="category"
                className="border-[#CECED7] mb-4 text-[#8891B2] border-2 rounded-md p-3 w-full sm:appearance-auto appearance-none"
              >
                <option value={selectedCategory?.id}>
                  {selectedCategory?.name || "Select Category"}
                </option>
              </Field>
            </div>
            <CategorySelectDropdown label="Make" name="make" options={makes} />
          </div>

          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
            <CategorySelectDropdown
              label="Model"
              name="model"
              options={modals}
            />
            <CategorySelectDropdown label="Type" name="type" options={types} />
          </div>
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-0">
            <CategorySelectDropdown
              label="Condition"
              name="condition"
              options={conditions}
            />
            <CategorySelectDropdown
              label="Year"
              name="year"
              options={yearsArray}
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
