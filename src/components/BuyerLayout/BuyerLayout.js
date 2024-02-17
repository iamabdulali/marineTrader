import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import CategoryList from "../categoryList/CategoryList";
import { AuthContext } from "../../Context/AuthContext";

const BuyerLayout = ({ children, showCategoryList }) => {
  const { selectedCategory, dispatch } = useContext(AuthContext);

  const onCategoryChange = (category) => {
    // Update selected category in the authentication context
    dispatch({ type: "UPDATE_SELECTED_CATEGORY_BUILD_AD", payload: category });
  };

  return (
    <>
      <Header />
      {showCategoryList ? (
        <div className="overflow-x-scroll category-menu">
          <CategoryList
            className="flex lg:w-full  justify-between px-24 mt-3 mb-6 smallLg:w-auto w-[1300px]"
            activeCategory="border-b-4 border-[#0D1A8B] py-4"
            unActiveCategory="py-4"
            onCategoryChange={onCategoryChange}
            onCategoryClick={() => {}}
          />
        </div>
      ) : (
        ""
      )}

      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BuyerLayout;
