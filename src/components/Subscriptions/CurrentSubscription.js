import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const CurrentSubscription = ({
  packageName,
  packageDuration,
  isStandard,
  featuresArray,
}) => {
  const dynamicClasses = isStandard
    ? "border-[#1565D8] text-[#1565d8]"
    : "border-[#36B37E] text-[#36B37E]";

  return (
    <div
      className={`bg-white shadow-[7px] px-5 py-4 border-l-4 ${dynamicClasses}`}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">
          {isStandard ? "Standard Trader" : "Dealer Plus"}
          <span className="text-[#8891B2] font-medium text-sm ml-1">
            {isStandard ? " Pay as you list" : " (12 months package)"}
          </span>
        </p>

        <Link className=" border-[3px] block rounded-md border-[#0D1A8B] text-[#0D1A8B] py-3 px-10 font-semibold ">
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
            <span className="text-[#8891B2]  ">Expires On: </span>30-04-2024
          </p>
        )}
      </div>
      <p className="font-medium text-[#11133D] mb-5">
        <span className="text-[#8891B2]  ">Category: </span>Jet Ski
      </p>
      <div className="mb-8 mt-5 grid grid-cols-4 text-[#183B56] gap-y-3">
        {featuresArray.map(({ id, featureName, standOut }) => {
          return (
            <p key={id} className="flex gap-4 font-medium mt-5">
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
