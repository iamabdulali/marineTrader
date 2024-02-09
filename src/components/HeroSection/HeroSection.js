import React, { useContext } from "react";
import { boatBg, jetski3d } from "../../assets";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { AuthContext } from "../../Context/AuthContext";

const HeroSection = () => {
  const { selectedCategory, dispatch } = useContext(AuthContext);

  console.log(selectedCategory);

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
    <div className="relative">
      <img src={backgroundImg} className="max-h-[670px] object-cover w-full" />
      <div className="absolute top-1/4  pl-24">
        <p className="text-white mb-3 flex items-center gap-3">
          {" "}
          <span className="bg-[#FFB800] h-[2px] w-12 inline-block"></span> Buy
          and Sell {selectedCategory || "Jet Skis"}
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
        <CategoryDropdown
          onSubmit={handleFormSubmit}
          category={selectedCategory}
        />
      </div>
    </div>
  );
};

export default HeroSection;
