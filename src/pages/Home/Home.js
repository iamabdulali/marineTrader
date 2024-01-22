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
      <CategoryLists />
      <HeroSection />
      <SpotLight />
      <Footer />
    </div>
  );
};

export default HomePage;
