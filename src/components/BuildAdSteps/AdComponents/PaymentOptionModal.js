import { Field } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentOptionModal = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg border-t-8 border-[#0D1A8B] py-3 px-6">
      <div className="flex items-center justify-between mt-3">
        <p className="text-[#0D1A8B] font-semibold">How do you want to pay?</p>
        <FaTimes
          className="cursor-pointer"
          onClick={onClose}
          color="#696E9D"
          size={24}
        />
      </div>
      <div className="mt-6">
        <div className="radio">
          <Field name="paymentMethod" id="paypal" type="radio" value="paypal" />
          <label
            htmlFor="paypal"
            className="radio-label mr-5 font-medium text-[#11133D]"
          >
            Paypal
          </label>
        </div>
        <div className="radio mt-3">
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
        </div>
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
      </div>
      <Link
        to="/payments"
        className="py-3 w-full text-center block mt-7 mb-4 text-white hover:bg-[#0a1dbd] bg-[#0D1A8B] rounded-md"
      >
        Submit
      </Link>
    </div>
  );
};

export default PaymentOptionModal;
