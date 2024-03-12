// CategoryList.jsx
import React, { useState, useEffect, useContext } from "react";
import { ReactSVG } from "react-svg";
import axios from "axios"; // Import axios for making HTTP requests
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
import { SERVER_BASE_URL } from "../..";
import { AuthContext } from "../../Context/AuthContext";

const CategoryList = ({
  categories: propCategories, // Pass categories as a prop
  onCategoryClick,
  initialCategory,
  className,
  activeCategory,
  unActiveCategory,
  onCategoryChange,
  defaultSelectedCategory,
  multiSelect = false, // Introduce multiSelect prop
  categories,
}) => {
  // const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    multiSelect
      ? defaultSelectedCategory || []
      : defaultSelectedCategory ||
          (propCategories.length > 0 ? [propCategories[initialCategory]] : [])
  );

  const categoryIcons = {
    Jetski: jetskiIcon,
    "Boat Home": boatHomeIcon,
    Commercial: commercialIcon,
    Yacht: motorYachtIcon,
    "Sail Boat": sailboatIcon,
    "Small Craft": smallcraftIcon,
    Fishing: fishingIcon,
    RIB: ribIcon,
    "Non Motor": nonMotorIcon,
  };

  const { dispatch } = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    let newSelectedCategories;

    if (multiSelect) {
      // Toggle selection for multiple categories
      newSelectedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
    } else {
      // Select a single category
      newSelectedCategories = category;
    }

    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);

    // Pass both category name and ID to the onCategoryClick callback
    const selectedCategoryId = categories.find(
      (cat) => cat.name === category
    )?.id;
    onCategoryClick({ name: category, id: selectedCategoryId });
    dispatch({
      type: "SELECTED_CATEGORY",
      payload: { name: category, id: selectedCategoryId },
    });
  };

  const getCategoryIcon = (category) => {
    const isSelected = selectedCategories.includes(category);
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
      {categories?.map((category) => (
        <div
          key={category.name} // Assuming 'name' is a unique identifier
          onClick={() => handleCategoryClick(category.name)} // Use category name as identifier
          className={`category-item cursor-pointer ${
            selectedCategories.includes(category.name)
              ? `${activeCategory}`
              : `${unActiveCategory}`
          }`}
        >
          <span className="category-icon">
            {getCategoryIcon(category.name)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
