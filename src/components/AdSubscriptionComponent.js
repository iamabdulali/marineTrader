import React, { useState } from "react";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import {
  adsImage,
  featuredSearchResult,
  premiumSearchResult,
  ribbon,
  standardSearchResult,
} from "../assets";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const AdSubscriptionComponent = ({
  packageName,
  price,
  buttonText,
  text,
  packageHeading,
  variant,
  isStandard,
  featuresArray,
}) => {
  let variantStyles = {};
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  switch (variant) {
    case "green":
      variantStyles = {
        backgroundColor: "bg-[#ebf8f3]",
        buttonBg: "bg-[#36B37E]",
        textColor: "text-[#36B37E]",
        ribbon: false,
        searchResult: standardSearchResult,
      };
      break;
    case "yellow":
      variantStyles = {
        backgroundColor: "bg-[#fdf7e8]",
        buttonBg: "bg-[#E6AB13]",
        textColor: "text-[#E6AB13]",
        ribbon: true,
        ribbonImage: adsImage,
        searchResult: premiumSearchResult,
      };
      break;
    case "purple":
      variantStyles = {
        backgroundColor: "bg-[#E5FFFF]",
        buttonBg: "bg-[#00CFCF]",
        textColor: "text-[#00CFCF]",
        ribbon: true,
        ribbonImage: ribbon,
        searchResult: featuredSearchResult,
      };
      break;
    default:
      // Default to some fallback styles if variant is not recognized
      variantStyles = {
        backgroundColor: "gray",
        color: "gray",
      };
  }

  const renderFeatures = (features) => {
    return features.map((feature, index) => (
      <p key={index} className="flex items-center mt-5 gap-4 font-medium">
        <FaCheckCircle size={20} />
        {feature}
      </p>
    ));
  };

  return (
    <div
      className={`block bg-white ad-subscription w-full mt-6 shadow-[8px] rounded-lg`}
    >
      <div
        className={`${variantStyles.backgroundColor} py-5 relative text-center `}
      >
        {variantStyles.ribbon ? (
          <img
            className="absolute w-32 -top-1 left-0"
            src={variantStyles.ribbonImage}
          />
        ) : (
          ""
        )}
        <p className={`${variantStyles.textColor} text-xl mb-3 font-semibold`}>
          {packageName}
        </p>
        <p className="text-[#171923] font-semibold text-4xl mb-7">{price}</p>
        <Link
          to="/selling/buildAd"
          className={`${variantStyles.buttonBg} text-white font-semibold inline-block py-3 w-9/12 rounded-lg`}
        >
          {buttonText}
        </Link>
        <button
          type="button"
          onClick={openModal}
          className={`${variantStyles.textColor} justify-center mt-4 mx-auto flex items-center gap-2 underline font-medium`}
        >
          <FaEye />
          {text}
        </button>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          opacity="bg-opacity-40"
          width="w-1/2"
        >
          <img src={variantStyles.searchResult} />
        </Modal>
      </div>
      <div className="py-10 px-10">
        <p className="text-[#171923] font-semibold">{packageHeading}</p>
        <div className="mt-6  justify-between pr-20">
          <div>{renderFeatures(featuresArray.slice(0, 3))}</div>
          {featuresArray.length > 3 && (
            <div>{renderFeatures(featuresArray.slice(3, 6))}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdSubscriptionComponent;
