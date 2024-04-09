import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import SpotLight from "../../components/SpotLight/SpotLight";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";

const HomePage = () => {
  return (
    <BuyerLayout showCategoryList={true}>
      <HeroSection />
      <SpotLight />
    </BuyerLayout>
  );
};

export default HomePage;
