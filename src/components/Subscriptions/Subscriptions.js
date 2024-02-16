import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { star } from "../../assets";

const Subscriptions = ({
  featuresArray,
  packageName,
  packagePrice,
  borderColor,
  subHeading,
  textColor,
}) => {
  return (
    <div
      className={`bg-white shadow-[7px] w-6/12 border-t-4 relative py-6 px-5 ${borderColor}`}
    >
      <p className="text-[#11133D] font-bold text-3xl ">
        {packagePrice}
        <span className="text-[#8891B2] font-medium text-sm ml-2 ">
          {subHeading}
        </span>
      </p>
      <p className={`${textColor} font-semibold text-2xl mt-3 `}>
        {packageName}
      </p>
      {packageName == "Dealer Plus" ? (
        <span className="text-[#8891B2] font-medium text-sm my-2 block">
          Includes 180 Ads/year
        </span>
      ) : packageName == "Broker Plus" ? (
        <span className="text-[#8891B2]  pointer-events-none font-medium text-sm my-2 block">
          Includes 300 Ads/year
        </span>
      ) : (
        <span className="text-[#8891B2] opacity-0 pointer-events-none font-medium text-sm my-2 block">
          Includes 300 Ads/year
        </span>
      )}

      <div className="flex gap-4 border-t-2 pt-6 w-full">
        <div className="bg-[#1A84FF] w-full text-white rounded-lg p-4 text-center">
          <p>Standard</p>
          <p className="mt-2 font-semibold">£1.49</p>
        </div>
        <div className="bg-[#FFB800] w-full text-white rounded-lg p-4 text-center">
          <p>Premium</p>
          <p className="mt-2 font-semibold">£5.99</p>
        </div>
        <div className="bg-[#36B37E] w-full text-white rounded-lg p-4 text-center">
          <p>Featured</p>
          <p className="mt-2 font-semibold">£11.99</p>
        </div>
      </div>
      <div className="mt-8 min-h-80">
        {featuresArray.map(({ id, featureName, standOut }) => {
          if (featureName === "Ads/Month") {
            // If the feature is "Ads/Month", display the appropriate number of ads based on the package
            return (
              <div
                key={id}
                className={`${standOut ? "font-semibold" : ""} flex gap-4 mt-5`}
              >
                <p
                  className={`bg-[#e1f4ec] rounded-full h-6 w-6 flex items-center justify-center`}
                >
                  <FaCheck color="#36B37E" size={10} />
                </p>
                {packageName === "Dealer Plus" ? 15 : 25} {featureName}
                {/* Display the appropriate number of ads */}
                {standOut ? <img className="w-6" src={star} alt="star" /> : ""}
              </div>
            );
          } else {
            // For other features, display them as usual
            return (
              <div
                key={id}
                className={`${standOut ? "font-semibold" : ""} flex gap-4 mt-5`}
              >
                <p
                  className={`bg-[#e1f4ec] rounded-full h-6 w-6 flex items-center justify-center`}
                >
                  <FaCheck color="#36B37E" size={10} />
                </p>
                {featureName}
                {standOut ? <img className="w-6" src={star} alt="star" /> : ""}
              </div>
            );
          }
        })}
      </div>
      <Link
        to="/payments"
        className="block text-center w-11/12 mx-auto border-[3px] border-[#0D1A8B] rounded-lg p-2 text-[#0D1A8B] font-semibold"
      >
        Select
      </Link>
    </div>
  );
};

export default Subscriptions;
