import React, { useContext } from "react";
import CategoryLists from "../categoryList/CategoryList";
import BuildLayout from "./BuildLayout";
import { AuthContext } from "../../Context/AuthContext";

const SelectCategoryStep1 = ({ categoryChange, multiSelect }) => {
  const { selectedCategory, dispatch } = useContext(AuthContext);

  const onCategoryChange = (category) => {
    // Update selected category in the authentication context
    dispatch({ type: "UPDATE_SELECTED_CATEGORY", payload: category });
  };

  return (
    <>
      <BuildLayout heading="Select Category">
        <CategoryLists
          className="flex flex-wrap gap-6 px-7"
          activeCategory="border-2 px-11 py-6 rounded-lg border-[#0D1A8B] bg-[#EFF0FF]"
          unActiveCategory="border-2 px-11 py-6 rounded-lg border-[#D9DFF5]"
          onCategoryChange={onCategoryChange}
          onCategoryClick={categoryChange}
          defaultSelectedCategory={selectedCategory}
          multiSelect={multiSelect}
        />
      </BuildLayout>
    </>
  );
};

export default SelectCategoryStep1;
