import React from "react";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { ribbon } from "../assets";

const AdSubscriptionComponent = ({
  packageName,
  price,
  buttonText,
  text,
  packageHeading,
  variant,
  isStandard,
}) => {
  let variantStyles = {};

  switch (variant) {
    case "green":
      variantStyles = {
        backgroundColor: "bg-[#ebf8f3]",
        buttonBg: "bg-[#36B37E]",
        textColor: "text-[#36B37E]",
        ribbon: false,
      };
      break;
    case "yellow":
      variantStyles = {
        backgroundColor: "bg-[#fdf7e8]",
        buttonBg: "bg-[#E6AB13]",
        textColor: "text-[#E6AB13]",
        ribbon: false,
      };
      break;
    case "purple":
      variantStyles = {
        backgroundColor: "bg-[#f6e8f8]",
        buttonBg: "bg-[#9D13B4]",
        textColor: "text-[#9D13B4]",
        ribbon: true,
      };
      break;
    default:
      // Default to some fallback styles if variant is not recognized
      variantStyles = {
        backgroundColor: "gray",
        color: "gray",
      };
  }

  console.log(variant);
  return (
    <div
      className={`flex bg-white ad-subscription w-full mt-6 shadow-[8px] rounded-lg`}
    >
      <div
        className={`${variantStyles.backgroundColor} py-5 relative text-center w-4/12 `}
      >
        {variantStyles.ribbon ? (
          <img className="absolute w-32 -top-1 left-0" src={ribbon} />
        ) : (
          ""
        )}
        <p className={`${variantStyles.textColor} text-xl mb-3 font-semibold`}>
          {packageName}
        </p>
        <p className="text-[#171923] font-semibold text-4xl mb-7">{price}</p>
        <button
          className={`${variantStyles.buttonBg} text-white font-semibold py-3 w-9/12 rounded-lg`}
        >
          {buttonText}
        </button>
        <p
          className={`${variantStyles.textColor} justify-center mt-4 flex items-center gap-2 underline font-medium`}
        >
          <FaEye />
          {text}
        </p>
      </div>
      <div className="py-10 px-10 w-8/12">
        <p className="text-[#171923] font-semibold">{packageHeading}</p>
        <div className="mt-6 flex justify-between pr-20">
          <div>
            <p className="flex items-center gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
            <p className="flex items-center mt-5 gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
            <p className="flex items-center mt-5 gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
          </div>
          <div className={`${isStandard ? "hidden" : "block"}`}>
            <p className="flex items-center gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
            <p className="flex items-center mt-5 gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
            <p className="flex items-center mt-5 gap-4 font-medium">
              <FaCheckCircle size={20} />
              200 Character Description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSubscriptionComponent;
