import React from "react";
import { FaEnvelope, FaFlag, FaPhone } from "react-icons/fa";

const OfferSectionHeader = ({ advert }) => {
  return (
    <div className="flex items-center justify-between sm:py-6 sm:px-7 py-4 px-0 sm:border-b-2">
      <div>
        <p className="text-[#11133D] font-semibold sm:text-4xl text-2xl">
          {advert?.currency?.symbol}
          {advert?.price}
        </p>
        <p className="text-[#696E9D] text-sm mt-2">(Tax not paid)</p>
      </div>
      <div className={`flex justify-end items-center gap-3`}>
        <a
          href={`mailto:${advert?.user?.email}`}
          className="bg-[#fff] border-2 w-12 h-12 cursor-pointer rounded-full flex items-center justify-center"
        >
          <FaEnvelope size={20} color="#0D1A8B" />
        </a>
        {/* <p className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center">
          <FaFlag size={20} color="#0D1A8B" />
        </p> */}
        <a
          href={`tel:${advert?.user?.phone_no}`}
          className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center"
        >
          <FaPhone size={20} color="#0D1A8B" />
        </a>
      </div>
    </div>
  );
};

export default OfferSectionHeader;
