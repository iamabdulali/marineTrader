import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import CategoryList from "../categoryList/CategoryList";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";

const BuyerLayout = ({ children, showCategoryList }) => {
  const [loading, setLoading] = useState(true);
  const [menuState, setMenuState] = useState(false);
  const { categories } = useContext(AuthContext);

  const handleMenuStateChange = (newState) => {
    setMenuState(newState);
  };

  useEffect(() => {
    if (categories.length != 0) {
      setLoading(false);
    }
  }, [categories]);

  return (
    <>
      <Header menuState={menuState} setMenuState={handleMenuStateChange} />
      <VerticalMenu
        menuState={menuState}
        setMenuState={handleMenuStateChange}
      />
      <LoadingWrapper loading={loading} className="top-0  -translate-x-1/2">
        {showCategoryList ? (
          <div className=" category-menu">
            <CategoryList
              className="flex smallLg:flex-nowrap smallLg:justify-between flex-wrap lg:w-full min-h-[88px] justify-start smallLg:gap-0  gap-4  bg-white
              smallLg:w-auto 2xl:px-24 sm:px-10 px-6 mt-3 mb-6"
              activeCategory="border-b-4 border-[#0D1A8B] py-4"
              unActiveCategory="py-4"
              onCategoryChange={(category) => {
                console.log(category);
              }}
              onCategoryClick={() => {}}
              categories={categories}
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
