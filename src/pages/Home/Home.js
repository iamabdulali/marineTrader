import React from "react";
import Header from "../../components/Header/Header";
import CategoryLists from "../../components/categoryList/CategoryList";
import HeroSection from "../../components/HeroSection/HeroSection";
import SpotLight from "../../components/SpotLight/SpotLight";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <CategoryLists
        className="flex lg:w-full  justify-between px-24 mt-3 mb-6 w-[1300px]"
        activeCategory="border-b-4 border-[#0D1A8B] py-4"
        unActiveCategory="py-4"
      />
      <HeroSection />
      <SpotLight />
      <Footer />
    </div>
  );
};

export default HomePage;
