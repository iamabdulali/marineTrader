import React from "react";
import { FaCheck, FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { star } from "../../assets";
import { Tooltip } from "react-tooltip";

const Subscriptions = ({
  featuresArray,
  packageName,
  packagePrice,
  borderColor,
  subHeading,
  textColor,
  id,
}) => {
  return (
    <div
      key={id}
      className={`bg-white shadow-[7px] lg:w-6/12 w-full border-t-4 relative py-6 sm:px-5 px-3 ${borderColor}`}
    >
      <p className="text-[#11133D] font-bold text-3xl ">
        {packagePrice}
        <span className="text-[#8891B2] font-medium text-sm ml-2 ">
          {subHeading}
        </span>
      </p>
      <p
        className={`${textColor} relative capitalize w-fit font-semibold text-2xl mt-3 `}
      >
        {packageName}
        <span
          data-tooltip-id={
            packageName === "Dealer Plus" || packageName === "Broker plus"
              ? "my-tooltip-1"
              : "my-tooltip-2"
          }
          className="bg-black absolute -right-8 cursor-pointer top-0 rounded-full p-[0.3rem]"
        >
          <FaInfo className=" text-white " size={12} />
        </span>
      </p>

      <Tooltip
        id="my-tooltip-1"
        place="bottom"
        content="Recommended for Dealers and Brokers"
      />
      <Tooltip
        id="my-tooltip-2"
        place="bottom"
        content="Recommended for Service Providers"
      />
      {packageName == "Dealer Plus" ? (
        <span className="text-[#8891B2] font-medium text-sm my-2 block">
          Includes 180 Ads/year
        </span>
      ) : packageName == "Broker plus" ? (
        <span className="text-[#8891B2]  pointer-events-none font-medium text-sm my-2 block">
          Includes 300 Ads/year
        </span>
      ) : (
        <span className="text-[#8891B2] opacity-0 pointer-events-none font-medium text-sm my-2 block">
          Includes 300 Ads/year
        </span>
      )}

      <div className="flex sm:gap-4 gap-2 border-t-2 pt-6 w-full">
        <div className="bg-[#1A84FF] w-full text-white rounded-lg sm:p-4 p-3 text-center">
          <p className="sm:text-base text-sm">Standard</p>
          <p className="mt-2 font-semibold sm:text-base text-sm">£1.49</p>
        </div>
        <div className="bg-[#FFB800] w-full text-white rounded-lg sm:p-4 p-3 text-center">
          <p className="sm:text-base text-sm">Premium</p>
          <p className="mt-2 font-semibold sm:text-base text-sm">£5.99</p>
        </div>
        <div className="bg-[#36B37E] w-full text-white rounded-lg sm:p-4 p-3 text-center">
          <p className="sm:text-base text-sm">Featured</p>
          <p className="mt-2 font-semibold sm:text-base text-sm">£11.99</p>
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
                {packageName == "Dealer Plus" ||
                packageName == "Broker Plus" ? (
                  <p
                    className={`bg-[#e1f4ec] rounded-full h-6 w-6 flex items-center justify-center`}
                  >
                    <FaCheck color="#36B37E" size={10} />
                  </p>
                ) : (
                  ""
                )}
                {packageName === "Dealer Plus"
                  ? 15
                  : packageName == "Broker Plus"
                  ? `25 ${featureName} ${
                      standOut ? (
                        <img className="w-6" src={star} alt="star" />
                      ) : (
                        ""
                      )
                    }`
                  : ""}{" "}
              </div>
            );
          } else {
            // For other features, display them as usual
            return (
              <div
                key={id}
                className={`${
                  standOut ? "items-center font-semibold" : ""
                } flex gap-4 mt-5`}
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
        to={`/payment/subscription/${id}`}
        className="block mt-6 text-center w-11/12 mx-auto border-[3px] border-[#0D1A8B] rounded-lg p-2 text-[#0D1A8B] font-semibold hover:bg-[#0D1A8B] hover:text-white"
      >
        Select
      </Link>
    </div>
  );
};

export default Subscriptions;
