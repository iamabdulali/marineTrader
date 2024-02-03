import React, { useState } from "react";
import MakeOfferForm from "../../components/ItemDetailsPage/MakeOfferForm";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiDroplet } from "react-icons/bi";
import { userProfile } from "../../assets";
import {
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaFlag,
  FaHandHoldingUsd,
  FaPhone,
  FaTools,
} from "react-icons/fa";
import ContentToggle from "../../components/ItemDetailsPage/ToggleContent";

const MakeOfferSection = () => {
  const [showTiming, setShowTiming] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    telephone: "",
    offer: "",
  };

  const handleFormSubmit = (values) => {
    // Your logic for handling form submission
    console.log("Form submitted with values:", values);
  };

  return (
    <div className="w-4/12 ">
      <div className="rounded-lg border-2">
        <div className="flex items-center justify-between py-6 px-7 border-b-2">
          <div>
            <p className="text-[#11133D] font-semibold text-4xl">$12,000</p>
            <p className="text-[#696E9D] text-sm mt-2">(Tax not paid)</p>
          </div>
          <div className={`flex justify-end items-center gap-3`}>
            <p className="bg-[#fff] border-2 w-12 h-12 cursor-pointer rounded-full flex items-center justify-center">
              <FaEnvelope size={20} color="#0D1A8B" />
            </p>
            <p className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center">
              <FaFlag size={20} color="#0D1A8B" />
            </p>
            <p className="bg-[#fff] w-12 h-12 border-2 cursor-pointer rounded-full flex items-center justify-center">
              <FaPhone size={20} color="#0D1A8B" />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-6 px-7 text-[#696E9D]  border-b-2">
          <p className="text-[#11133D] font-medium">Dealer Plus Member</p>
          <div className="flex items-center gap-5 ">
            <FaHandHoldingUsd size={24} />
            <CiDeliveryTruck size={30} fill="#696E9D" />
            <BiDroplet size={20} />
            <FaTools size={20} />
          </div>
        </div>
        <div className="flex gap-4 items-center px-7 py-6">
          <img src={userProfile} className="rounded-full w-20 object-contain" />
          <div>
            <p className="text-[#11133D] font-semibold">John Smith</p>
            <p className="text-sm text-[#696E9D]">Member Since January 2020</p>
          </div>
        </div>
        <p className=" px-7 py-6 bg-[#B6BDD7] bg-opacity-20 text-[#11133D] font-semibold text-xl ">
          Make An Offer
        </p>
        <div className="px-7 py-6">
          <MakeOfferForm
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <div className="rounded-lg border-2 mt-5">
        <ContentToggle title="Opening Times" setShowContent={setShowTiming} />
        <div className={`pb-5 px-7 ${showTiming ? "block" : "hidden"}`}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thrusday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => {
            return (
              <div className="flex justify-between items-center mt-5 text-[#11133D] font-semibold">
                <p>{day}</p>
                <p>00:00 AM-10:30 AM</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-lg border-2 mt-5">
        <ContentToggle setShowContent={setShowFacilities} title="Facilities" />
        <div
          className={`pb-5 px-7 ${
            showFacilities ? "block" : "hidden"
          } grid grid-cols-2`}
        >
          {[
            "WC",
            "Accomodation",
            "Parking",
            "Disabled Access",
            "Reception",
            "Counter",
          ].map((day) => {
            return (
              <div className=" mt-5 text-[#11133D] font-semibold">
                <div className="flex items-center gap-5">
                  <span className="h-2 w-2 rounded-full bg-[#0D1A8B]"></span>
                  <p>{day}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MakeOfferSection;
