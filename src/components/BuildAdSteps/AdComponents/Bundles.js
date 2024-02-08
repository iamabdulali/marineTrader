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
}) => {
  return (
    <div
      className={`${bgColor} mb-5 flex items-center justify-between py-7 px-7 border-l-[6px] ${bundleBorder} rounded-lg`}
    >
      <p className={`${bundleNameColor} text-lg font-semibold min-w-44`}>
        {BundleName} Bundle
      </p>
      <p className="text-[#11133D] font-semibold">{adverts} Adverts</p>
      <p className="font-semibold">£{price}</p>
      <Field
        type="checkbox"
        name="bundles"
        value={checkbox}
        className="w-[25px] h-[25px]"
      />
    </div>
  );
};

export default Bundles;
