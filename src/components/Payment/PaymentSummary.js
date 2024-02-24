import React from "react";

const PaymentSummary = () => {
  return (
    <div className="bg-white shadow-[7px] rounded-md p-6 mt-6 w-full">
      <p className="text-[#11133D] font-semibold text-xl">Summary</p>
      <div className="mt-4 sm:text-base text-sm">
        <div className=" flex items-center justify-between">
          <p className="text-[#696E9D]">Subscription:</p>
          <p className="text-[#11133D] font-semibold">Broker Plus</p>
        </div>
        <div className=" flex items-center justify-between mt-2">
          <p className="text-[#696E9D]">Price:</p>
          <p className="text-[#11133D] font-semibold">£1.49</p>
        </div>
        <p className="text-[#0D1A8B] font-semibold mt-2">Package</p>
        <div className=" flex items-center justify-between mt-2">
          <p className="text-[#696E9D]">Standard:</p>
          <p className="text-[#11133D] font-semibold">£1.49</p>
        </div>
        <p className="text-[#0D1A8B] font-semibold mt-2">Ad</p>
        <div className=" flex items-center justify-between mt-2">
          <p className="text-[#696E9D]">Standard:</p>
          <p className="text-[#11133D] font-semibold">£10.99</p>
        </div>
        <div className="mt-6 relative">
          <input
            type="text"
            className="uppercase w-full border-[#8891B2] text-[#8891b2] border-2 py-4 rounded-md px-3"
            placeholder="Promo Code"
          />
          <button className="text-white bg-[#0D1A8B] hover:bg-[#0a1dbd] py-2 rounded-md px-6 font-semibold top-1/2 -translate-y-1/2 absolute right-3">
            Apply
          </button>
        </div>
        <div className="border-[#E8E8E8] border-y-2 py-3 mt-7">
          <div className=" flex items-center justify-between mt-2">
            <p className="text-[#696E9D]">SubTotal:</p>
            <p className="text-[#11133D] font-semibold">£11.49</p>
          </div>
          <div className=" flex items-center justify-between mt-2">
            <p className="text-[#696E9D]">Tax:</p>
            <p className="text-[#11133D] font-semibold">£5.99</p>
          </div>
        </div>
        <div className=" flex items-center justify-between mt-4">
          <p className="text-[#11133D] font-semibold">Total:</p>
          <p className="text-[#11133D] font-semibold">£16.49</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
