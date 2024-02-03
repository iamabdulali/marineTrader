import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ContentToggle = ({ title, setShowContent }) => {
  const [showFacilities, setShowFacilities] = useState(true);

  const handleToggle = () => {
    setShowFacilities(!showFacilities);
    setShowContent(!showFacilities); // Assuming setShowContent is a prop received from the parent component
  };

  return (
    <div
      className={`flex justify-between cursor-pointer items-center py-6 px-7 ${
        showFacilities ? "border-b-2" : ""
      } `}
      onClick={handleToggle}
    >
      <p className="font-semibold text-xl text-[#11133D]">{title}</p>
      {showFacilities ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
    </div>
  );
};

export default ContentToggle;
