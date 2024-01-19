import React from "react";

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
        <button className="bg-[#FFB800] text-[#11133D] font-semibold p-3 px-6 mt-7 rounded-xl">
          {buttonText}
        </button>
      </div>
      <img className="w-56" src={image} />
    </div>
  );
};

export default WelcomeMessage;
