import React, { useEffect, useState } from "react";
import Bundles from "./Bundles";
import { fetchOptions } from "../../../utils/fetch/fetchData";
import LoadingWrapper from "../../../utils/LoadingWrapper";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";

const BundlesModal = ({ onClick }) => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions("bundles", setBundles, setLoading);
  }, []);

  const { values } = useFormikContext();

  const variants = [
    "border-[#1565D8]",
    "border-[#36B37E]",
    "border-[#E6AB13]",
    "border-[#9D13B4]",
    "border-[#D81515]",
  ];
  const bgVariants = [
    "bg-[#F7FAFF]",
    "bg-[#E9FFF6]",
    "bg-[#FFFCF6]",
    "bg-[#FEF5FF]",
    "bg-[#FFF6F6]",
  ];
  const textVariants = [
    "text-[#1565D8]",
    "text-[#36B37E]",
    "text-[#E6AB13]",
    "text-[#9D13B4]",
    "text-[#D81515]",
  ];

  return (
    <>
      <div className="bg-gradient-to-t w-full py-4 rounded-tr-lg rounded-tl-lg from-[#0d1a8b] to-[#3241cb]">
        <p className="text-white text-xl font-semibold text-center mb-1">
          BUNDLES : STANDARD Advert
        </p>
        <p className="text-[#A2A9EB] text-sm text-center">
          Current price per advert: £ 0.99
        </p>
      </div>
      <div className="py-4 px-6">
        <p className="text-sm text-[#8891B2] mt-2 mb-4">
          Select the most suitable bundle for you:
        </p>
        <LoadingWrapper loading={loading} className="top-1/2 -translate-y-1/2">
          {bundles?.map(({ id, name, amount, total_adverts }) => {
            return (
              <Bundles
                key={id}
                bundleNameColor={`${textVariants[id - 1]}`}
                bundleBorder={`${variants[id - 1]}`}
                bgColor={`${bgVariants[id - 1]}`}
                BundleName={name}
                adverts={total_adverts}
                price={amount}
                checkbox={id}
                // hasDiscount={true}
                // oldPrice="19.79"
              />
            );
          })}
        </LoadingWrapper>
      </div>
      <div className="text-right pr-6 pb-6">
        <button
          type="button"
          onClick={onClick}
          className="bg-[#8891B2] text-white py-3 px-7 rounded-md mr-3 min-w-[120px]"
        >
          Close
        </button>
        <Link
          to={`/payment/bundle/${values?.bundles}`}
          onClick={onClick}
          type="button"
          className="bg-[#0D1A8B] text-white py-3 px-7 rounded-md"
        >
          Confirm
        </Link>
      </div>
    </>
  );
};

export default BundlesModal;
