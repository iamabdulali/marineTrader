import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ContentToggle = ({
  title,
  setShowContent,
  className,
  textStyles,
  iconSize,
}) => {
  const [showFacilities, setShowFacilities] = useState(true);

  const handleToggle = () => {
    setShowFacilities(!showFacilities);
    setShowContent(!showFacilities); // Assuming setShowContent is a prop received from the parent component
  };

  return (
    <div
      className={`${className} ${showFacilities ? "border-b-2" : ""} `}
      onClick={handleToggle}
    >
      <p className={`${textStyles}`}>{title}</p>
      {showFacilities ? (
        <FaChevronUp size={iconSize} />
      ) : (
        <FaChevronDown size={iconSize} />
      )}
    </div>
  );
};

export default ContentToggle;
