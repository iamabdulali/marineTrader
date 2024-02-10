import React, { useState } from "react";
import Layout from "../Layout/Layout";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Heading from "../Heading";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const generateStripeToken = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(cardNumberElement, {
      address_country: country,
      address_zip: postalCode,
    });

    if (!token || error) {
      throw error;
    }

    return token;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await generateStripeToken();
      console.log(token);
      navigate("/paymentStatus");
    } catch (error) {
      navigate("/paymentStatus");
      console.log(error);
    }
  };

  return (
    <Layout>
      <Heading content="Payment Details" />
      <form
        onSubmit={handlePaymentSubmit}
        className="bg-white shadow-[7px] rounded-md p-6 mt-6 w-1/2"
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
              <option value="">Country</option>
              <option value="us">United States</option>
              <option value="uk">UK</option>
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
              type="number"
              name="postalCode"
              className="border-[#8891B2] font-medium text-[#8891B2] border-2 rounded-lg p-3 w-full text-sm"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <button
          className={`bg-[#0D1A8B] text-white p-3 rounded-md mt-4 w-full`}
        >
          Pay
        </button>
      </form>
    </Layout>
  );
};

export default PaymentForm;
