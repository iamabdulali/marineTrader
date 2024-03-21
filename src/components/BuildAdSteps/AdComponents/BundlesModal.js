import React, { useEffect, useState } from "react";
import Bundles from "./Bundles";
import { fetchOptions } from "../../../utils/fetch/fetchData";
import LoadingWrapper from "../../../utils/LoadingWrapper";

const BundlesModal = ({ onClick }) => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions("bundles", setBundles, setLoading);
  }, []);

  const variants = ["#1565D8", "#36B37E", "#E6AB13", "#9D13B4", "#D81515"];
  const bgVariants = ["#F7FAFF", "#E9FFF6", "#FFFCF6", "#FEF5FF", "#FFF6F6"];

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
                bundleNameColor={`text-[${variants[id - 1]}]`}
                bundleBorder={`border-[${variants[id - 1]}]`}
                bgColor={`bg-[${bgVariants[id - 1]}]`}
                BundleName={name}
                adverts={total_adverts}
                price={amount}
                checkbox={name}
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
        <button
          onClick={onClick}
          type="button"
          className="bg-[#0D1A8B] text-white py-3 px-7 rounded-md"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default BundlesModal;
