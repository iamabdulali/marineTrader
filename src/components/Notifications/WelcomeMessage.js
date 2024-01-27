import React from "react";
import { Link } from "react-router-dom";

const WelcomeMessage = ({
  heading,
  subHeading,
  buttonText,
  image,
  className,
}) => {
  return (
    <div className={className} id="welcome-div">
      <div>
        <p className="text-3xl font-semibold">{heading}</p>
        <p className="mt-2">{subHeading}</p>
        <Link
          to="/selling/adSubscription"
          className="bg-[#FFB800] inline-block text-[#11133D] font-semibold p-3 px-6 mt-7 rounded-xl"
        >
          {buttonText}
        </Link>
      </div>
      <img className="w-56" src={image} />
    </div>
  );
};

export default WelcomeMessage;
