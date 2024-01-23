import React, { useState } from "react";
import CategoryLists from "../categoryList/CategoryList";
import BuildLayout from "./BuildLayout";

const SelectCategoryStep1 = ({ onCategoryChange }) => {
  return (
    <>
      <BuildLayout heading="Select Category">
        <CategoryLists
          className="flex flex-wrap gap-6 px-7"
          activeCategory="border-2 px-11 py-6 rounded-lg border-[#0D1A8B] bg-[#EFF0FF]"
          unActiveCategory="border-2 px-11 py-6 rounded-lg border-[#D9DFF5]"
          onCategoryChange={onCategoryChange}
        />
      </BuildLayout>
    </>
  );
};

export default SelectCategoryStep1;
