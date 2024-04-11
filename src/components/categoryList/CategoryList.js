// CategoryList.jsx
import React, { useState, useEffect, useContext } from "react";
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
  categories,
}) => {
  // const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    defaultSelectedCategory ||
      (propCategories.length > 0 ? [propCategories[initialCategory]] : [])
  );

  const categoryIcons = {
    jetski: jetskiIcon,
    "boat-home": boatHomeIcon,
    commercial: commercialIcon,
    yacht: motorYachtIcon,
    "sail-boat": sailboatIcon,
    "small-craft": smallcraftIcon,
    fishing: fishingIcon,
    rib: ribIcon,
    "non-motor": nonMotorIcon,
  };

  const { dispatch, selectedCategory } = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    let newSelectedCategories;
    newSelectedCategories = category;

    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);

    // Pass both category name and ID to the onCategoryClick callback
    const selectedCategoryId = categories.find(
      (cat) => cat.slug === category
    )?.id;
    onCategoryClick({ name: category, id: selectedCategoryId });
    dispatch({
      type: "SELECTED_CATEGORY",
      payload: { name: category, id: selectedCategoryId },
    });
  };

  const getCategoryIcon = (category) => {
    const isSelected = selectedCategories.includes(category);

    const strokeColor =
      isSelected && selectedCategory != null ? "#0D1A8B" : "#8891B2";
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

  useEffect(() => {
    if (selectedCategory == null) {
      setSelectedCategories([]);
    } else {
      const arr = [selectedCategory?.name.toLowerCase().replace(/\s+/g, "-")];
      setSelectedCategories(arr);
    }
  }, [selectedCategory]);

  return (
    <div className={`category-list ${className}`}>
      {categories?.map((category) => {
        return (
          <div
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`category-item cursor-pointer ${
              selectedCategories?.includes(category.slug)
                ? `${activeCategory}`
                : `${unActiveCategory}`
            }`}
          >
            <span className="category-icon">
              {getCategoryIcon(category.slug)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
