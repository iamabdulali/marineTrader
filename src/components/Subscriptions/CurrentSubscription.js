import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const CurrentSubscription = ({
  packageName,
  packageDuration,
  isStandard,
  featuresArray,
  category,
  expiry_date,
  id,
}) => {
  const dynamicClasses = isStandard
    ? "border-[#1565D8] text-[#1565d8]"
    : "border-[#36B37E] text-[#36B37E]";

  return (
    <div
      className={`bg-white shadow-[7px] px-5 py-4 border-l-4 ${dynamicClasses}`}
    >
      <div className="flex sm:flex-row sm:gap-0 gap-4 flex-col justify-between sm:items-center">
        <p className="font-semibold text-2xl capitalize">
          {/* {isStandard ? "Standard Trader" : "Dealer Plus"} */}
          {packageName}
          <span className="text-[#8891B2] font-medium text-sm ml-1">
            {isStandard ? " Pay as you list" : " (12 months package)"}
          </span>
        </p>

        <Link
          to={`/payment/subscription/${id}`}
          className=" border-[3px] sm:w-auto hover:bg-[#0D1A8B] hover:text-white w-full text-center block rounded-md border-[#0D1A8B] text-[#0D1A8B] py-3 px-10 font-semibold "
        >
          {isStandard ? "Upgrade Now" : "Renew"}
        </Link>
      </div>

      <div className="flex justify-end items-center my-3">
        <p className="font-semibold text-[#11133D] text-3xl">
          {" "}
          {isStandard ? "Free" : ""}
        </p>
        {isStandard ? (
          ""
        ) : (
          <p className="font-medium text-[#11133D]">
            <span className="text-[#8891B2]  ">Expires On: </span>
            {expiry_date}
          </p>
        )}
      </div>
      <p className="font-medium text-[#11133D] mb-5">
        <span className="text-[#8891B2]  ">Category: </span>
        {category}
      </p>
      <div className="mb-8 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-[#183B56] gap-y-3">
        {featuresArray?.map(({ id, featureName, standOut }) => {
          return (
            <p key={id} className="flex gap-4 font-medium mt-5 mr-5">
              <p className="bg-[#e1f4ec] rounded-full  h-6 w-6 flex items-center justify-center">
                <FaCheck color="#36B37E" size={10} />
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
