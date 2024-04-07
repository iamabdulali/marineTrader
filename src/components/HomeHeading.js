import React from "react";
import { Link } from "react-router-dom";

const HomeHeading = ({ heading, buttonText, to, className, onClick }) => {
  return (
    <div className={`flex  items-center justify-between ${className}`}>
      <p className="text-[#11133D] text-2xl font-semibold">{heading}</p>
      <button
        onClick={onClick}
        className="text-[#0D1A8B] underline font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomeHeading;
