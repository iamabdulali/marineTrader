import React, { useContext } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import SpotLight from "../../components/SpotLight/SpotLight";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import { AuthContext } from "../../Context/AuthContext";

const HomePage = () => {
  return (
    <BuyerLayout showCategoryList={true}>
      <HeroSection />
      <SpotLight />
    </BuyerLayout>
  );
};

export default HomePage;
