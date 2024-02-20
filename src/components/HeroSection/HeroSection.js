import React, { useContext } from "react";
import { boatBg } from "../../assets";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { AuthContext } from "../../Context/AuthContext";

const HeroSection = () => {
  const { selectedCategory } = useContext(AuthContext);

  const handleFormSubmit = (values) => {
    // Your logic for handling form submission
    console.log("Form submitted with values:", values);
  };

  const categoryBackgrounds = {
    "Jet Skis": boatBg,
    "Boat Home":
      "https://www.marinetrader.com/wp-content/uploads/2020/12/jet-ski-cat-banner.jpg",
    // Add more categories and their background images as needed
  };

  // Default background image
  let backgroundImg = boatBg;

  // Set background image based on selected category
  if (selectedCategory && categoryBackgrounds[selectedCategory]) {
    backgroundImg = categoryBackgrounds[selectedCategory];
  }

  return (
    <div className="relative hero-section-div bg-cover w-full lg:bg-top">
      <img
        src={backgroundImg}
        className="min-h-[657px] object-cover w-full lg:block hidden"
      />
      <div className="lg:absolute top-1/4 2xl:px-24 sm:px-10 px-6 lg:py-0 py-10">
        <p className="text-white mb-3 flex items-center gap-3">
          {" "}
          <span className="bg-[#FFB800] h-[2px] w-12 inline-block"></span> Buy
          and Sell {selectedCategory || "Jet Skis"}
        </p>
        <p className="text-white sm:text-5xl text-4xl font-bold sm:leading-tight">
          Freedom is Just <br /> An Anchor{" "}
          <span className="text-[#FFB800]">Away</span>
        </p>
        <p className="text-white lg:w-6/12 w-full mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
      </div>
      <div className="lg:absolute right-20 top-[17%] lg:w-5/12 w-full lg:px-0 sm:px-10 px-6 lg:py-0 sm:py-10 pb-10 pt-0">
        <CategoryDropdown
          onSubmit={handleFormSubmit}
          category={selectedCategory}
        />
      </div>
    </div>
  );
};

export default HeroSection;
