import { Field } from "formik";
import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

const PaymentOptionModal = ({
  onClose,
  id,
  hasSubscription,
  hasSpotlight,
  advert,
}) => {
  const { advert_package_id } = Object(advert);
  console.log(advert_package_id);
  return (
    <div className="bg-white rounded-lg border-t-8 border-[#0D1A8B] py-3 px-6">
      <div className={`flex items-center justify-between mt-3`}>
        <p className="text-[#0D1A8B] font-semibold">How do you want to pay?</p>

        <FaTimes
          className="cursor-pointer"
          onClick={onClose}
          color="#696E9D"
          size={24}
        />
      </div>

      <div className="mt-6">
        {/* <div className="radio">
          <Field name="paymentMethod" id="paypal" type="radio" value="paypal" />
          <label
            htmlFor="paypal"
            className="radio-label mr-5 font-medium text-[#11133D]"
          >
            Paypal (Coming Soon)
          </label>
        </div> */}
        {/* <div className="radio mt-3">
          <Field
            name="paymentMethod"
            id="monthlyAllowance"
            type="radio"
            value="monthlyAllowance"
          />
          <label
            htmlFor="monthlyAllowance"
            className="radio-label mr-5 font-medium text-[#11133D]"
          >
            Inclusive Monthly Allowance
          </label>
        </div> */}
        {advert_package_id == "1" ? (
          <div className="radio mt-3">
            <Field
              name="paymentMethod"
              id="checkout"
              type="radio"
              value="checkout"
            />
            <label
              htmlFor="checkout"
              className="radio-label mr-5 font-medium text-[#11133D]"
            >
              Checkout
            </label>
          </div>
        ) : hasSubscription && !hasSpotlight ? (
          <div className="radio mt-3">
            <label
              htmlFor="allowance"
              className="radio-label mr-5 font-medium text-[#11133D]"
            >
              Dont worry, Your subscription allowance or your bundle has covered
              this ad!
            </label>
          </div>
        ) : (
          <div className="radio mt-3">
            <Field
              name="paymentMethod"
              id="checkout"
              type="radio"
              value="checkout"
            />
            <label
              htmlFor="checkout"
              className="radio-label mr-5 font-medium text-[#11133D]"
            >
              Checkout
            </label>
          </div>
        )}
      </div>
      {hasSubscription && !hasSpotlight && advert_package_id != "1" ? (
        <Link
          to="/dashboard"
          className="py-3 w-full text-center block mt-7 mb-4 text-white hover:bg-[#0a1dbd] bg-[#0D1A8B] rounded-md"
        >
          Back To Dashboard
        </Link>
      ) : (
        <Link
          to={`/payment/advert/${id}`}
          className="py-3 w-full text-center block mt-7 mb-4 text-white hover:bg-[#0a1dbd] bg-[#0D1A8B] rounded-md"
        >
          Pay Now
        </Link>
      )}
    </div>
  );
};

export default PaymentOptionModal;
