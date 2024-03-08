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
import { closeModal, openModal } from "../utils/ModalOpeningClosingFunctions";

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
  let [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  switch (variant) {
    case "Standard":
      variantStyles = {
        backgroundColor: "bg-[#ebf8f3]",
        buttonBg: "bg-[#36B37E]",
        textColor: "text-[#36B37E]",
        ribbon: false,
        searchResult: standardSearchResult,
        monthlyAllowance: false,
      };
      break;
    case "Premium":
      variantStyles = {
        backgroundColor: "bg-[#fdf7e8]",
        buttonBg: "bg-[#E6AB13]",
        textColor: "text-[#E6AB13]",
        ribbon: false,
        ribbonImage: adsImage,
        searchResult: premiumSearchResult,
        monthlyAllowance: true,
      };
      break;
    case "Featured":
      variantStyles = {
        backgroundColor: "bg-[#E5FFFF]",
        buttonBg: "bg-[#00CFCF]",
        textColor: "text-[#00CFCF]",
        ribbon: true,
        ribbonImage: ribbon,
        searchResult: featuredSearchResult,
        monthlyAllowance: true,
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
            className="absolute 2xl:w-32 sm:w-32 lg:w-20 w-20 -top-1 left-0"
            src={variantStyles.ribbonImage}
          />
        ) : (
          ""
        )}
        <p className={`${variantStyles.textColor} text-3xl mb-3 font-semibold`}>
          {packageName}
        </p>
        <p className="text-[#171923] font-semibold text-4xl mb-3">{price}</p>
        {variantStyles.monthlyAllowance ? (
          <div className="text-sm text-[#11133D] font-medium">
            <p>
              Inclusive Monthly Allowance:{" "}
              <span className="text-[#E6AB13] font-semibold">15 Remaining</span>
            </p>
            <p className="mt-2 mb-3">
              Bundle Balance:{" "}
              <span className="text-[#FF4A6B] font-semibold">9 Remaining</span>
            </p>
          </div>
        ) : (
          <div className="text-sm text-[#11133D] opacity-0">
            <p>
              Inclusive Monthly Allowance:{" "}
              <span className="text-[#E6AB13] font-semibold">15 Remaining</span>
            </p>
            <p className="mt-2 mb-3">
              Bundle Balance:{" "}
              <span className="text-[#FF4A6B] font-semibold">9 Remaining</span>
            </p>
          </div>
        )}

        <Link
          to="/selling/buildAd"
          className={`${variantStyles.buttonBg} hover:bg-opacity-85 text-white font-semibold inline-block py-3 w-9/12 rounded-lg`}
        >
          {buttonText}
        </Link>
        <button
          type="button"
          onClick={() => openModal(setIsSearchResultOpen)}
          className={`${variantStyles.textColor} justify-center mt-4 mx-auto flex items-center gap-2 underline font-medium`}
        >
          <FaEye />
          {text}
        </button>
        <Modal
          isOpen={isSearchResultOpen}
          onClose={() => closeModal(setIsSearchResultOpen)}
          opacity="bg-opacity-40"
          width="lg:w-1/2 sm:w-10/12 w-full"
          padding="p-6"
        >
          <img src={variantStyles.searchResult} />
        </Modal>
      </div>
      <div className="py-10 px-10">
        <p className="text-[#171923] font-semibold">{packageHeading}</p>
        <div className="mt-6  justify-between 2xl:pr-20">
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
