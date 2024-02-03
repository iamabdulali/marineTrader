import React from "react";
import { Link } from "react-router-dom";

const HomeHeading = ({ heading, buttonText, to, className }) => {
  return (
    <div className={`flex  items-center justify-between ${className}`}>
      <p className="text-[#11133D] text-2xl font-semibold">{heading}</p>
      <Link className="text-[#0D1A8B] underline font-medium" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default HomeHeading;
