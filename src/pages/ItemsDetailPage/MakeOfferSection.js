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
import OfferSectionHeader from "./OfferSectionHeader";

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
    <div className="xl:w-4/12 w-full">
      <div className="rounded-lg border-2">
        <div className="hidden sm:block">
          <OfferSectionHeader />
        </div>
        <div className="flex items-center justify-between py-6 sm:px-7 px-4 text-[#696E9D]  border-b-2">
          <p className="text-[#11133D] font-medium sm:text-base text-sm">
            Dealer Plus Member
          </p>
          <div className="flex items-center sm:gap-5 gap-4">
            <FaHandHoldingUsd size={24} />
            <CiDeliveryTruck size={30} fill="#696E9D" />
            <BiDroplet size={20} />
            <FaTools size={20} />
          </div>
        </div>
        <div className="flex gap-4 items-center sm:px-7 py-6 px-4">
          <img src={userProfile} className="rounded-full w-20 object-contain" />
          <div>
            <p className="text-[#11133D] font-semibold">John Smith</p>
            <p className="text-sm text-[#696E9D]">Member Since January 2020</p>
          </div>
        </div>
        <p className="sm:px-7 px-4 py-6 bg-[#B6BDD7] bg-opacity-20 text-[#11133D] font-semibold text-xl ">
          Make An Offer
        </p>
        <div className="sm:px-7 py-6 px-4">
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
                <p className="sm:text-base text-sm">{day}</p>
                <p className="sm:text-base text-sm">00:00 AM-10:30 AM</p>
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
                  <p className="sm:text-base text-sm">{day}</p>
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
