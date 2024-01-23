import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import {
  boatHomeIcon,
  commercialIcon,
  fishingIcon,
  jetskiIcon,
  motorYachtIcon,
  nonMotorIcon,
  ribIcon,
  sailboatIcon,
  smallcraftIcon,
} from "../../assets";

const CategoryList = ({
  categories,
  onCategoryClick,
  className,
  activeCategory,
  unActiveCategory,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Jet Skis");

  const categoryIcons = {
    "Jet Skis": jetskiIcon,
    "Boat Home": boatHomeIcon,
    Commercial: commercialIcon,
    "Motor/Yacht": motorYachtIcon,
    Sailboat: sailboatIcon,
    Smallcraft: smallcraftIcon,
    Fishing: fishingIcon,
    Rib: ribIcon,
    "Non-Motor": nonMotorIcon,
  };

  const setIconStyles = (svg, strokeColor, strokeOpacity) => {
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("stroke-opacity", strokeOpacity);
  };

  const getCategoryIcon = (category) => {
    const isSelected = category === selectedCategory;
    const strokeColor = isSelected ? "#0D1A8B" : "#8891B2";
    const beforeInjection = (svg) => {
      const paths = svg.querySelectorAll("path");
      // svg.setAttribute("width", 90);
      // svg.setAttribute("height", 90);

      paths.forEach((path) => {
        path.setAttribute("fill", strokeColor);
      });
    };
    return (
      <ReactSVG
        src={categoryIcons[category]}
        beforeInjection={beforeInjection}
      />
    );
  };

  return (
    <div className={`category-list ${className}`}>
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => {
            onCategoryChange(category);
            onCategoryClick(category);
            setSelectedCategory(category);
          }}
          className={`category-item cursor-pointer ${
            category === selectedCategory
              ? `${activeCategory}`
              : `${unActiveCategory}`
          }`}
        >
          <span className="category-icon">{getCategoryIcon(category)}</span>
        </div>
      ))}
    </div>
  );
};

const CategoryLists = ({
  className,
  activeCategory,
  unActiveCategory,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Jet Skis");

  const categories = [
    "Jet Skis",
    "Boat Home",
    "Commercial",
    "Motor/Yacht",
    "Sailboat",
    "Smallcraft",
    "Fishing",
    "Rib",
    "Non-Motor",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="overflow-x-scroll lg:overflow-auto">
      <CategoryList
        className={className}
        activeCategory={activeCategory}
        unActiveCategory={unActiveCategory}
        categories={categories}
        onCategoryClick={handleCategoryClick}
        onCategoryChange={onCategoryChange}
        onCategoryChangeProp={onCategoryChange}
      />
    </div>
  );
};

export default CategoryLists;
