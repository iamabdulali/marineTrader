import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { stackIcon } from "../../assets";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";
import { countryOptions } from "../../utils/DropdownOptions";

const StripePaymentForm = ({
  handlePaymentSubmit,
  spinner,
  id,
  hasSubscription,
  advertType,
  hasFeaturedBundle,
  hasPremiumBundle,
}) => {
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const { seller_type } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  useEffect(() => {
    const checkValidity = () => {
      if (!elements) return false; // Ensure elements object is available
      const cardNumber = elements.getElement(CardNumberElement);
      const cardCvc = elements.getElement(CardCvcElement);
      const cardExpiry = elements.getElement(CardExpiryElement);

      const isCardNumberValid =
        cardNumber && !cardNumber._empty && !cardNumber._invalid;
      const isCvcValid = cardCvc && !cardCvc._empty && !cardCvc._invalid;
      const isExpiryValid =
        cardExpiry && !cardExpiry._empty && !cardExpiry._invalid;

      // You can adjust the validation criteria according to your requirements
      return (
        isCardNumberValid &&
        isCvcValid &&
        isExpiryValid &&
        postalCode.trim() !== "" &&
        country.trim() !== ""
      );
    };

    // Enable or disable the Pay button based on form validity
    const isValid = checkValidity();
    setIsFormValid(isValid);
  }, [elements, postalCode, country]);

  // const [hasFeaturedBundle, setHasFeaturedBundle] = useState(0);
  // const [hasPremiumBundle, setHasPremiumBundle] = useState(0);

  // useEffect(() => {
  //   fetchOptions(
  //     `bundle/advert/remains?type=featured&category_id=${id}`,
  //     setHasFeaturedBundle
  //   );
  //   fetchOptions(
  //     `bundle/advert/remains?type=premium&category_id=${id}`,
  //     setHasPremiumBundle
  //   );
  // }, [id]);

  return (
    <div className="smallLg:w-1/2 w-full">
      <form
        onSubmit={handlePaymentSubmit}
        className="bg-white shadow-[7px] rounded-md p-6 mt-6 w-full"
      >
        <p className="text-[#11133D] font-semibold text-xl">Payment Details</p>
        <label className="text-[#4F5B76] text-sm font-medium mt-7 block mb-2">
          Card Number
        </label>
        <CardNumberElement
          className="border-[#8891B2] border-2 rounded-lg p-3"
          options={{
            showIcon: true,
            iconStyle: "solid",
            style: {
              base: {
                fontWeight: "500",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                color: "#8891B2",
                "::placeholder": { color: "#8891B2" },
              },
            },
          }}
        />
        <div className="flex items-center gap-5 mt-4">
          <div className="w-full">
            <label className="text-[#4F5B76] text-sm font-medium block mb-2">
              CVC
            </label>
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontWeight: "500",
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    fontSize: "16px",
                    color: "#8891B2",
                    "::placeholder": { color: "#8891B2" },
                  },
                },
              }}
              className="border-[#8891B2] border-2 rounded-lg p-3"
            />
          </div>
          <div className="w-full">
            <label className="text-[#4F5B76] text-sm font-medium block mb-2">
              Expiry
            </label>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontWeight: "500",
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    fontSize: "16px",
                    color: "#8891B2",
                    "::placeholder": { color: "#8891B2" },
                  },
                },
              }}
              className="border-[#8891B2] border-2 rounded-lg p-3"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-full">
            <label className="text-[#4F5B76] text-sm font-medium block mb-2">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="border-[#8891B2] font-medium text-[#8891B2] border-2 rounded-lg p-3 w-full text-sm"
            >
              <option value={``}>Select Country</option>;
              {countryOptions.map(({ name, id }) => {
                return <option value={`${id}`}>{name}</option>;
              })}
            </select>
          </div>
          <div className="w-full ">
            <label className="text-[#4F5B76] text-sm font-medium block mb-2">
              Postal Code
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              type="text"
              name="postalCode"
              className="border-[#8891B2] font-medium text-[#8891B2] border-2 rounded-lg p-3 w-full text-sm"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <button
          disabled={!isFormValid}
          className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 rounded-md mt-4 w-full`}
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
            "Pay"
          )}
        </button>
      </form>
      {!isPrivateSeller &&
      advertType != "Standard" &&
      !window.location.href.includes("subscription") &&
      (hasSubscription != 0 ||
        hasFeaturedBundle != 0 ||
        hasPremiumBundle != 0) ? (
        <div className="bg-[#1C5DBF] text-white p-6 mt-8 shadow-[7px]">
          <p className="sm:text-2xl text-base font-semibold">
            <img
              className="inline-block w-10 sm:mr-0 mr-3"
              src={stackIcon}
              alt="stackIcon"
            />{" "}
            Allowances/Bundles
          </p>
          {hasSubscription != 0 ? (
            <div className="flex items-center sm:text-base text-sm justify-between border-b-2 border-white mt-4 pb-3">
              <p>Inclusive Monthly Allowance</p>
              <p className="font-medium sm:text-lg text-base">
                {hasSubscription}
              </p>
            </div>
          ) : (
            ""
          )}
          {hasPremiumBundle != 0 ? (
            <div className="flex items-center sm:text-base text-sm justify-between mt-3">
              <p>Premium Bundle Balance</p>
              <p className="font-medium sm:text-lg text-base">
                {hasPremiumBundle}
              </p>
            </div>
          ) : (
            ""
          )}
          {hasFeaturedBundle != 0 ? (
            <div className="flex items-center sm:text-base text-sm justify-between mt-3">
              <p>Featured Bundle Balance</p>
              <p className="font-medium sm:text-lg text-base">
                {hasFeaturedBundle}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default StripePaymentForm;
