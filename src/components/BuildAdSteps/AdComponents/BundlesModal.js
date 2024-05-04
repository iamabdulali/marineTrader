import React, { useContext, useEffect, useState } from "react";
import Bundles from "./Bundles";
import { fetchOptions } from "../../../utils/fetch/fetchData";
import LoadingWrapper from "../../../utils/LoadingWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_BASE_URL } from "../../..";
import { displayErrorMessages } from "../../../utils/displayErrors";
import { Oval } from "react-loader-spinner";
import { AuthContext } from "../../../Context/AuthContext";

const BundlesModal = ({ onClick, setSelectedBundle, bundleType }) => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  if (bundleType == "Standard") {
    bundleType = "Premium";
  }

  useEffect(() => {
    fetchOptions(`bundles?type=${bundleType}`, setBundles, setLoading);
  }, []);

  const { isValid } = useFormikContext();

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

  const showErrorMessage = () => {
    if (!isValid) toast.error("Please Fill All Fields To Buy Bundle");
  };

  const { user, currencyRates } = useContext(AuthContext);

  const { currency } = Object(user);

  return (
    <form>
      <div className="bg-gradient-to-t w-full py-4 rounded-tr-lg rounded-tl-lg from-[#0d1a8b] to-[#3241cb]">
        <p className="text-white text-xl font-semibold text-center mb-1">
          BUNDLES : {bundleType} Advert
        </p>
        <p className="text-[#A2A9EB] text-sm text-center font-semibold">
          Current price per advert: £ 0.99
        </p>
      </div>
      <div className="py-4 px-6  min-h-[40vh]">
        <p className="text-sm text-[#8891B2] mt-2 mb-4">
          Select the most suitable bundle for you:
        </p>
        <LoadingWrapper
          loading={loading}
          className="top-1/2 -translate-y-1/2  -translate-x-1/2"
        >
          {bundles?.map(({ id, name, amount, total_adverts }) => {
            return (
              <Bundles
                key={id}
                bundleNameColor={`${textVariants[id - 1]}`}
                bundleBorder={`${variants[id - 1]}`}
                bgColor={`${bgVariants[id - 1]}`}
                BundleName={name}
                adverts={total_adverts}
                price={`${currency?.symbol}${Number(
                  amount * currencyRates[currency?.currency_code]
                ).toFixed(2)}`}
                checkbox={id}
                setSelectedBundle={setSelectedBundle}
              />
            );
          })}
        </LoadingWrapper>
      </div>
      <div className="text-right pr-6 pb-6">
        <button
          type="button"
          onClick={onClick}
          className="bg-[#8891B2] text-white py-3 px-7 rounded-md mr-3 min-w-[121px] min-h-[48px]"
        >
          Close
        </button>
        <button
          onClick={!isValid ? showErrorMessage : onClick}
          type="button"
          className="bg-[#0D1A8B] text-white py-3 px-7 rounded-md"
        >
          {spinner ? (
            <Oval
              secondaryColor="#fff"
              color="#fff"
              width={20}
              height={20}
              wrapperClass="justify-center"
            />
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </form>
  );
};

export default BundlesModal;
