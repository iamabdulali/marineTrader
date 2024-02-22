import { Field } from "formik";
import React from "react";

const Bundles = ({
  bgColor,
  bundleNameColor,
  BundleName,
  adverts,
  price,
  checkbox,
  bundleBorder,
  hasDiscount,
  oldPrice,
}) => {
  return (
    <div
      className={`${bgColor} mb-5 flex items-center justify-between py-9 sm:px-7 px-4 sm:border-l-[6px] border-l-[4px] ${bundleBorder} rounded-lg`}
    >
      <p
        className={`${bundleNameColor} sm:text-lg text-sm font-semibold  sm:min-w-44 sm:mr-0 mr-2`}
      >
        {BundleName} Bundle
      </p>
      <p className="text-[#11133D] font-semibold sm:text-base text-xs">
        {adverts} Adverts
      </p>
      {hasDiscount ? (
        <div className="flex items-center gap-3 relative">
          <p className="text-xs text-[#8891B2] font-medium line-through">
            {oldPrice}
          </p>
          <p className="font-semibold sm:text-sm text-xs">£{price}</p>
          <p className="bg-[#FFB800] absolute text-[#11133D] min-w-16 right-0 -top-8 font-semibold text-xs py-1 px-2 rounded-md">
            20% Off
          </p>
        </div>
      ) : (
        <p className="font-semibold sm:text-base text-xs">£{price}</p>
      )}
      <Field
        type="checkbox"
        name="bundles"
        value={checkbox}
        className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] sm:ml-0 ml-2"
      />
    </div>
  );
};

export default Bundles;
