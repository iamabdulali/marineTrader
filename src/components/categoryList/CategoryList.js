// CategoryList.jsx
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
  categories = [
    "Jet Skis",
    "Boat Home",
    "Commercial",
    "Motor/Yacht",
    "Sailboat",
    "Smallcraft",
    "Fishing",
    "Rib",
    "Non-Motor",
  ],
  // categories,
  onCategoryClick,
  className,
  activeCategory,
  unActiveCategory,
  onCategoryChange,
  defaultSelectedCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    defaultSelectedCategory || (categories.length > 0 ? categories[0] : null)
  );

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    onCategoryClick(category);
  };

  const getCategoryIcon = (category) => {
    const isSelected = category === selectedCategory;
    const strokeColor = isSelected ? "#0D1A8B" : "#8891B2";
    const beforeInjection = (svg) => {
      const paths = svg.querySelectorAll("path");

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
          onClick={() => handleCategoryClick(category)}
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

export default CategoryList;
