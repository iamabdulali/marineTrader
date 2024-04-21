import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { categoriesList } from "../..";

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

  return (
    <div
      className={`bg-white shadow-[7px] px-5 py-4 border-l-4 ${dynamicClasses}`}
    >
      <div className="flex sm:flex-row sm:gap-0 gap-4 flex-col justify-between sm:items-center">
        <p className="font-semibold text-2xl capitalize">
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
            } ] hover:text-white w-full text-center block rounded-md  py-3 px-10 font-semibold ${dynamicClasses}`}
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
            } ] hover:text-white w-full text-center block rounded-md  py-3 px-10 font-semibold ${dynamicClasses}`}
          >
            Upgrade
          </button>
        )}
      </div>

      <div className="flex justify-end items-center my-3">
        <p className="font-medium text-[#11133D]">
          <span className="text-[#8891B2]  ">Expires On: </span>
          {expiry_date}
        </p>
      </div>
      <p className="font-medium text-[#11133D] mb-5">
        <span className="text-[#8891B2]  ">Category: </span>
        {category}
      </p>
      <div className="mb-8 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-[#183B56] gap-y-3">
        {featuresArray?.map(({ id, featureName, standOut }) => {
          return (
            <p
              key={id}
              className="flex gap-4 font-medium mt-5 mr-5 items-baseline"
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
      </div>
    </div>
  );
};

export default CurrentSubscription;
