import React from "react";
import { boatBg } from "../../assets";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";

const HeroSection = () => {
  const handleFormSubmit = (values) => {
    // Your logic for handling form submission
    console.log("Form submitted with values:", values);
  };
  return (
    <div className="relative">
      <img src={boatBg} />
      <div className="absolute top-1/4  pl-24">
        <p className="text-white mb-3 flex items-center gap-3">
          {" "}
          <span className="bg-[#FFB800] h-[2px] w-12 inline-block"></span> Buy
          and Sell Yatch
        </p>
        <p className="text-white text-5xl font-bold leading-tight">
          Freedom is Just <br /> An Anchor{" "}
          <span className="text-[#FFB800]">Away</span>
        </p>
        <p className="text-white w-6/12 mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
      </div>
      <div className="absolute right-20 top-[17%] w-5/12">
        <CategoryDropdown onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default HeroSection;
