import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import CategoryList from "../categoryList/CategoryList";

const BuyerLayout = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("Jet Skis");
  const handleCategoryChange = (category, setFieldValue) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Header />
      <CategoryList
        className="flex lg:w-full  justify-between px-24 mt-3 mb-6 w-[1300px]"
        activeCategory="border-b-4 border-[#0D1A8B] py-4"
        unActiveCategory="py-4"
        onCategoryChange={() => handleCategoryChange(selectedCategory)}
        onCategoryClick={() => handleCategoryChange(selectedCategory)}
      />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BuyerLayout;
