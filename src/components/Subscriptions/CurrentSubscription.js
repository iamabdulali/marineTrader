import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { categoriesList } from "../..";
import { star } from "../../assets";

const CurrentSubscription = ({
  packageName,
  featuresArray,
  category,
  expiry_date,
  setHasSubscription,
  categoryId,
  id,
  subscription_plan_id,
}) => {
  const dynamicClasses =
    packageName == "Broker plus"
      ? "border-[#36B37E] text-[#36B37E] "
      : "border-[#FFB800] text-[#FFB800]";

  const { dispatch, selectedCategory } = useContext(AuthContext);
  console.log(selectedCategory?.name);

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

  return (
    <div
      className={`bg-white shadow-[7px] px-5 py-4 border-l-4 ${dynamicClasses}`}
    >
      <div className="flex sm:flex-row sm:gap-0 gap-4 flex-col justify-between sm:items-center">
        <p className="font-semibold sm:text-2xl text-lg capitalize">
          {/* {isStandard ? "Standard Trader" : "Dealer Plus"} */}
          {packageName}
          <span className="text-[#8891B2] font-medium text-sm ml-1">
            (12 months package)
          </span>
        </p>
        {packageName == "Broker plus" ? (
          <Link
            to={`/payment/subscription/${subscription_plan_id}`}
            onClick={() => {
              // setHasSubscription(false);
              dispatch({
                type: "SELECTED_CATEGORY",
                payload: { id: categoryId, name: categoriesList[categoryId] },
              });
              // document.querySelector(`.${selectedCategory?.name}`).click();
            }}
            className={`border-[3px] sm:w-auto ${
              packageName == "Broker plus"
                ? "hover:bg-[#36B37E]"
                : "hover:bg-[#FFB800]"
            } ] hover:text-white w-full sm:text-base text-sm  text-center block rounded-md  py-3 px-10 font-semibold ${dynamicClasses}`}
          >
            Renew
          </Link>
        ) : (
          <button
            onClick={() => {
              setHasSubscription(false);
              dispatch({
                type: "SELECTED_CATEGORY",
                payload: { id: null, name: categoriesList[categoryId] },
              });
              // document.querySelector(`.category-${categoryId}`).click();
            }}
            className={`border-[3px] sm:w-auto ${
              packageName == "Broker plus"
                ? "hover:bg-[#36B37E]"
                : "hover:bg-[#FFB800]"
            } ] hover:text-white w-full sm:text-base text-sm  text-center block rounded-md  py-3 px-10 font-semibold ${dynamicClasses}`}
          >
            Upgrade
          </button>
        )}
      </div>

      <div className="flex justify-end items-center my-3 sm:text-base text-sm ">
        <p className="font-medium text-[#11133D]">
          <span className="text-[#8891B2]  ">Expires On: </span>
          {expiry_date}
        </p>
      </div>
      <p className="font-medium text-[#11133D] mb-5 sm:text-base text-sm ">
        <span className="text-[#8891B2]">Category: </span>
        {category}
      </p>
      {/* <div className="mb-8 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-[#183B56] gap-y-3">
        {featuresArray?.map(({ id, featureName, standOut }) => {
          return (
            <p
              key={id}
              className="flex gap-4 font-medium sm:text-base text-sm  mt-5 mr-5 items-baseline"
            >
              <p
                className={`${
                  packageName == "Broker plus"
                    ? "bg-[#e1f4ec]"
                    : "bg-[#ffb80021]"
                }  rounded-full  min-h-6 min-w-6 flex items-center justify-center`}
              >
                <FaCheck
                  color={packageName == "Broker plus" ? "#36B37E" : "#FFB800"}
                  size={10}
                />
              </p>
              {featureName}
            </p>
          );
        })}
      </div> */}
      {console.log(featuresArray)}
      <div className="mb-8 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-[#183B56] gap-y-3">
        {mapFeaturesToText(featuresArray)?.map((featureText, index) => (
          <div className="flex items-baseline font-medium gap-4" key={index}>
            <p
              className={`${
                packageName == "Broker plus" ? "bg-[#e1f4ec]" : "bg-[#ffb80021]"
              } mt-5 rounded-full h-6 w-6 flex items-center justify-center `}
            >
              <FaCheck
                color={packageName == "Broker plus" ? "#36B37E" : "#FFB800"}
                size={10}
              />
            </p>
            <div className="flex items-end gap-3">
              {featureText}
              {/* {featureText.endsWith("Ads/Month") && (
                <img className="w-6" src={star} alt="star" />
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentSubscription;
