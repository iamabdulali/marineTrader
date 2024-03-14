import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import CategoryList from "../categoryList/CategoryList";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { fetchOptions } from "../../utils/fetch/fetchData";

const BuyerLayout = ({ children, showCategoryList }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuState, setMenuState] = useState(false);

  const handleMenuStateChange = (newState) => {
    setMenuState(newState);
  };

  useEffect(() => {
    fetchOptions("categories", setCategories, setLoading);
  }, []);

  return (
    <>
      <Header menuState={menuState} setMenuState={handleMenuStateChange} />
      <VerticalMenu
        menuState={menuState}
        setMenuState={handleMenuStateChange}
      />
      <LoadingWrapper loading={loading} className="top-0  -translate-x-1/2">
        {showCategoryList ? (
          <div className="overflow-x-scroll category-menu">
            <CategoryList
              className="flex lg:w-full min-h-[88px] justify-between 2xl:px-24 sm:px-10 px-6 mt-3 mb-6 smallLg:w-auto w-[1300px]"
              activeCategory="border-b-4 border-[#0D1A8B] py-4"
              unActiveCategory="py-4"
              onCategoryChange={(category) => {
                console.log(category);
              }}
              onCategoryClick={() => {}}
              categories={categories}
              setLoading={setLoading}
            />
          </div>
        ) : (
          ""
        )}

        <div>{children}</div>
        <Footer />
      </LoadingWrapper>
    </>
  );
};

export default BuyerLayout;
