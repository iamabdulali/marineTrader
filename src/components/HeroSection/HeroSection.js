import React, { useContext } from "react";
import { boatBg } from "../../assets";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const Navigate = useNavigate();
  const { selectedCategory } = useContext(AuthContext);

  const handleFormSubmit = async (values) => {
    const queryParams = new URLSearchParams();
    if (selectedCategory?.id)
      queryParams.append("category", selectedCategory?.id);
    if (values.make) queryParams.append("make", values.make);
    if (values.model) queryParams.append("model", values.model);
    if (values.type) queryParams.append("type", values.type);
    if (values.condition) queryParams.append("condition", values.condition);
    if (values.year) queryParams.append("year", values.year);

    const queryString = queryParams.toString();
    console.log(queryString);

    // Navigate to list page with the constructed query string
    Navigate(`/list${queryString ? `?${queryString}` : ""}`);
  };

  const categoryBackgrounds = {
    jetski:
      "https://images.unsplash.com/photo-1648484983838-b47185140bee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commercial:
      "https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "boat-home":
      "https://www.marinetrader.com/wp-content/uploads/2020/12/jet-ski-cat-banner.jpg",
    "small-craft":
      "https://images.unsplash.com/photo-1658878529562-00ec6a436ee5?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fishing:
      "https://images.unsplash.com/photo-1583249598754-b7a2f59651fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "non-motor":
      "https://images.unsplash.com/photo-1444487233259-dae9d907a740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rib: "https://images.unsplash.com/photo-1613993854053-151c103d3fb6?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // Add more categories and their background images as needed
  };

  console.log(selectedCategory?.name);

  // Default background image
  let backgroundImg = boatBg;

  // Set background image based on selected category
  if (selectedCategory && categoryBackgrounds[selectedCategory?.name]) {
    backgroundImg = categoryBackgrounds[selectedCategory?.name];
    console.log(backgroundImg);
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
          and Sell {selectedCategory?.name || "Jet Skis"}
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
          category={selectedCategory?.name}
        />
      </div>
    </div>
  );
};

export default HeroSection;
