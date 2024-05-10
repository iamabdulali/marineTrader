import React from "react";
import { FaEnvelope, FaFlag, FaPhone } from "react-icons/fa";
import { GiBoatFishing, GiSail, GiSailboat } from "react-icons/gi";
import { noTrailer } from "../../assets";
import { Tooltip } from "react-tooltip";

const OfferSectionHeader = ({ advert, phone_no, email, calling_code }) => {
  return (
    <div className="flex items-center justify-between sm:py-6 sm:px-7 py-4 px-0 sm:border-b-2">
      <div className="relative">
        <p className="text-[#11133D] font-semibold sm:text-4xl text-2xl">
          {advert?.currency?.symbol}
          {advert?.price}
        </p>
        <p className="text-[#696E9D] text-sm mt-2">(Tax not paid)</p>
        <p className="absolute top-0 -right-12">
          {advert?.trailers == "yes" ? (
            <GiSailboat color="#1CBF73" size={35} />
          ) : advert?.trailers == "no" ? (
            <img src={noTrailer} className="w-10" />
          ) : (
            <GiSailboat color="#FFB800" size={35} />
          )}
        </p>
      </div>

      <div className={`flex justify-end items-center gap-3`}>
        <a
          data-tooltip-id="email-tooltip"
          href={`mailto:${advert?.user?.email}`}
          className="bg-[#fff] border-2 w-12 h-12 cursor-pointer rounded-full flex items-center justify-center"
        >
          <FaEnvelope size={20} color="#0D1A8B" />
        </a>
        {/* <p className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center">
          <FaFlag size={20} color="#0D1A8B" />
        </p> */}
        <a
          data-tooltip-id="phone-number-tooltip"
          href={`tel:${advert?.user?.phone_no}`}
          className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center"
        >
          <FaPhone size={20} color="#0D1A8B" />
        </a>
      </div>
      <Tooltip id="email-tooltip" place="bottom" content={email} />
      <Tooltip
        id="phone-number-tooltip"
        place="bottom"
        content={calling_code + phone_no}
      />
    </div>
  );
};

export default OfferSectionHeader;
