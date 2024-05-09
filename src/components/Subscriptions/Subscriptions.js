import React, { useContext } from "react";
import { FaCheck, FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import selected from "../../assets/selected.png";
import star from "../../assets/star.png";
import { AuthContext } from "../../Context/AuthContext";

const Subscriptions = ({
  featuresArray,
  packageName,
  packagePrice,
  borderColor,
  subHeading,
  textColor,
  id,
  selectedSubscription,
}) => {
  // Check if the user is subscribed to Broker plus or Dealer plus within the same category
  const isSubscribedToBrokerPlus =
    selectedSubscription?.subscription_plan?.name === "Broker plus";

  const isSubscribedToDealerPlus =
    selectedSubscription?.subscription_plan?.name === "Dealer plus";

  // Disable Service plus if subscribed to Broker plus or Dealer plus
  const isServicePlusDisabled =
    (packageName === "Service plus" && isSubscribedToBrokerPlus) ||
    (packageName === "Service plus" && isSubscribedToDealerPlus);

  // Disable Standard Trader if subscribed to Broker plus or Dealer plus
  const isStandardTraderDisabled =
    (packageName === "Standard Trader" && isSubscribedToBrokerPlus) ||
    (packageName === "Standard Trader" && isSubscribedToDealerPlus);
  // Check if the current package is selected or subscribed to
  const isSelectedOrSubscribed =
    packageName === selectedSubscription?.subscription_plan?.name;

  // Map features to text descriptions
  const mapFeaturesToText = (features) => {
    const featureText = {
      customer_reviews:
        features.customer_reviews === "yes" ? "Customer Reviews" : null,
      virtual_showroom:
        features.virtual_showroom === "yes" ? "Virtual Showroom" : null,
      search_result_boost:
        features.search_result_boost > 0
          ? `${features.search_result_boost}x Search Results Boost`
          : null,
      website_link: features.website_link === "yes" ? "Website Link" : null,
      picture_gallery:
        features.picture_gallery === "yes" ? "Picture Gallery" : null,
      promotional_discount:
        features.promotional_discount === "yes"
          ? "Enables Promotional Discount Offers"
          : null,
      company_profile:
        features.company_profile === "yes" ? "Company Profile" : null,
      listings_in_business:
        features.listings_in_business > 0
          ? `${features.listings_in_business}x Listings in Business Plus+ Directory`
          : null,
      premium_per_month:
        features.premium_per_month > 0
          ? `${features.premium_per_month} Ads/Month`
          : null,
    };

    // Filter out null values (for features that should not be displayed)
    return Object.values(featureText).filter((text) => text !== null);
  };

  const { currencyRates, user } = useContext(AuthContext);
  const { currency } = Object(user);

  return (
    <div
      key={id}
      className={`${
        isSelectedOrSubscribed
          ? "bg-white"
          : isServicePlusDisabled || isStandardTraderDisabled
          ? "opacity-80"
          : "bg-white"
      } shadow-[7px] lg:w-6/12 w-full border-t-4 relative py-6 sm:px-5 px-3 ${borderColor}`}
    >
      <p className="text-[#11133D] font-bold text-3xl">
        {`${currency?.symbol}${Number(
          packagePrice * currencyRates[currency?.currency_code]
        ).toFixed(0)}`}
        <span className="text-[#8891B2] font-medium text-sm ml-2">
          {subHeading}
        </span>
      </p>
      <p
        className={`${textColor} relative capitalize w-fit font-semibold text-2xl mt-3`}
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
          <FaInfo className="text-white" size={12} />
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

      {packageName === "Dealer Plus" ? (
        <span className="text-[#8891B2] font-medium text-sm my-2 block">
          Includes 180 Ads/year
        </span>
      ) : packageName === "Broker plus" ? (
        <span className="text-[#8891B2] pointer-events-none font-medium text-sm my-2 block">
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
          <p className="mt-2 font-semibold sm:text-base text-sm">{`${
            currency?.symbol
          }${Number(1.49 * currencyRates[currency?.currency_code]).toFixed(
            2
          )}`}</p>
        </div>
        <div className="bg-[#FFB800] w-full text-white rounded-lg sm:p-4 p-3 text-center">
          <p className="sm:text-base text-sm">Premium</p>
          <p className="mt-2 font-semibold sm:text-base text-sm">{`${
            currency?.symbol
          }${Number(5.99 * currencyRates[currency?.currency_code]).toFixed(
            2
          )}`}</p>
        </div>
        <div className="bg-[#36B37E] w-full text-white rounded-lg sm:p-4 p-3 text-center">
          <p className="sm:text-base text-sm">Featured</p>
          <p className="mt-2 font-semibold sm:text-base text-sm">
            {`${currency?.symbol}${Number(
              11.99 * currencyRates[currency?.currency_code]
            ).toFixed(2)}`}{" "}
          </p>
        </div>
      </div>

      <div className="mt-8 min-h-80">
        {mapFeaturesToText(featuresArray).map((featureText, index) => (
          <div className="flex items-baseline font-medium gap-4" key={index}>
            <p className="bg-[#e1f4ec] mt-5 rounded-full h-6 w-6 flex items-center justify-center">
              <FaCheck color="#36B37E" size={10} />
            </p>
            <div className="flex items-end gap-3">
              {featureText}
              {featureText.endsWith("Ads/Month") && (
                <img className="w-6" src={star} alt="star" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Disable Service plus if subscribed to Broker plus */}
      {isServicePlusDisabled ? (
        <button
          disabled
          className="block mt-6 text-center w-11/12 mx-auto border-[3px] border-gray-400 rounded-lg p-2 text-gray-400 font-semibold cursor-not-allowed"
        >
          Service Plus Subscription Disabled
        </button>
      ) : packageName === selectedSubscription?.subscription_plan?.name ? (
        // Render subscription info for the selected subscription
        <>
          <img
            src={selected}
            className="sm:w-40 w-20 -top-4 -right-1 absolute z-10"
          />
          <Link
            to={`/payment/subscription/${id}`}
            className="block mt-6 text-center w-11/12 mx-auto border-[3px] border-[#0D1A8B] rounded-lg p-2 text-[#0D1A8B] font-semibold hover:bg-[#0D1A8B] hover:text-white"
          >
            Renew
          </Link>
        </>
      ) : (
        // Render subscription options
        <Link
          to={`/payment/subscription/${id}`}
          className="block mt-6 text-center w-11/12 mx-auto border-[3px] border-[#0D1A8B] rounded-lg p-2 text-[#0D1A8B] font-semibold hover:bg-[#0D1A8B] hover:text-white"
        >
          Select
        </Link>
      )}
    </div>
  );
};

export default Subscriptions;
