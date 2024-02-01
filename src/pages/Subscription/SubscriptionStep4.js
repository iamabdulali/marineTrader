import React from "react";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/Heading";
import { FaCheck } from "react-icons/fa";
import { jetSkiText } from "../../assets";

const SubscriptionStep4 = () => {
  return (
    <>
      <Heading content="Summary" className="mt-14" />
      <div className="shadow-[7px] bg-white mt-4">
        <p className="border-b-2 font-semibold px-4 py-3">Category</p>
        <div className="px-4 py-5">
          <img src={jetSkiText} className="w-28" />
        </div>
      </div>
      <div className="shadow-[7px] bg-white mt-4">
        <p className="border-b-2 font-semibold px-4 py-3">Subscription</p>
        <div className="px-4 py-3">
          <div className="text-[#696E9D] flex items-center ">
            <p className="min-w-16">Trade: </p>
            <span className="text-[#11133D] ml-4 font-medium">
              Standard Trade
            </span>
          </div>
          <div className="text-[#696E9D] mt-3 flex items-center ">
            <p className="min-w-16">Price: </p>{" "}
            <span className="text-[#11133D] ml-4 font-medium">Free</span>
          </div>
          <p className="text-[#0D1A8B] font-semibold my-4 text-sm">
            Advertisement Fee
          </p>
          <div className="flex items-center gap-8">
            <p className="text-[#696E9D]">
              Standard:{" "}
              <span className="text-[#11133D] ml-4 font-medium">$1.49</span>
            </p>
            <p className="text-[#696E9D]">
              Premium:{" "}
              <span className="text-[#11133D] ml-4 font-medium">$5.99</span>
            </p>
            <p className="text-[#696E9D]">
              Featured:{" "}
              <span className="text-[#11133D] ml-4 font-medium">$11.99</span>
            </p>
          </div>
          <p className="text-[#0D1A8B] font-semibold my-4 text-sm">Features</p>
          <div className="flex gap-4 font-medium mb-5">
            <p className="bg-[#e1f4ec] rounded-full  h-6 w-6 flex items-center justify-center">
              <FaCheck color="#36B37E" size={10} />
            </p>
            Cheaper Advert Cost
          </div>
        </div>
      </div>
      <div className="shadow-[7px] bg-white mt-4">
        <p className="border-b-2 font-semibold px-4 py-3">Company Info</p>
        <div className="px-4 py-3">Jet Ski</div>
      </div>
    </>
  );
};

export default SubscriptionStep4;
