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
        <p className="md:text-3xl extraSm:text-xl text-base font-semibold">
          {heading}
        </p>
        <p className="mt-2 sm:text-base text-sm">{subHeading}</p>
        <Link
          to="/selling"
          className="bg-[#FFB800] sm:text-base text-xs inline-block text-[#11133D] font-semibold p-3 sm:px-6 px-3 mt-7 rounded-xl"
        >
          {buttonText}
        </Link>
      </div>
      <img className="md:w-56 extraSm:w-40 sm:pl-0 pl-3 w-32" src={image} />
    </div>
  );
};

export default WelcomeMessage;
