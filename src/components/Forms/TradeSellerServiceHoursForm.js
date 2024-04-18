import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { plusSign } from "../../assets";
import SelectDropdown from "./FormElements/SelectDropdown";
import { timeZoneOptions } from "../../utils/DropdownOptions";
import FileInput from "./FormElements/FileInput";
import Heading from "../Heading";
import ServiceHours from "./FormElements/ServiceHours";
import { initialFacilities } from "../../utils/DummyData";
import Modal from "../Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import FacilitiesModal from "./FacilitiesModal";

export default function TradeSellerServiceHoursForm() {
  const { values, setValues } = useFormikContext();
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

  const handleDayClick = (day) => {
    const { working_days } = values;
    const selectedIndex = working_days.indexOf(day);
    let newSelectedDays = [...working_days];

    if (selectedIndex === -1) {
      newSelectedDays.push(day);
    } else {
      newSelectedDays.splice(selectedIndex, 1);
    }

    // Sort the selected days before updating the state
    newSelectedDays = newSelectedDays.sort((a, b) => {
      const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    });

    setValues({ ...values, working_days: newSelectedDays });
  };

  const [facilities, setFacilities] = useState(initialFacilities.facilities);

  const [newFacility, setNewFacility] = useState("");

  const handleNewFacilityChange = (e) => {
    setNewFacility(e.target.value);
  };

  const handleAddFacility = () => {
    if (newFacility.trim() !== "") {
      setFacilities((prevFacilities) => ({
        ...prevFacilities,
        [newFacility]: false,
      }));
      setNewFacility("");
    }
    closeModal(setIsFacilitiesOpen);
  };

  return (
    <div className="md:mx-8 mx-3 text-sm">
      <Heading content="Business Details" />
      <div className="2xl:w-1/2  mt-5">
        <label className=" inline-block w-full">
          Time Zone
          <SelectDropdown
            name="timezone"
            options={timeZoneOptions}
            className="border-[#CECED7] border-2 text-[#8891B2] rounded-md p-3 w-full mt-3 mb-2"
          />
        </label>
        <ErrorMessage
          name="timezone"
          component="span"
          className="text-red-500"
        />
      </div>
      {/* Select Days */}
      <div>
        <p className="font-semibold my-5">Select Days:</p>
        <div className="flex gap-3  flex-wrap">
          {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>
              <button
                type="button"
                name="daysAvailable"
                className={`${
                  values.working_days.includes(day)
                    ? "bg-[#0D1A8B] text-white"
                    : "bg-white text-[#8891B2] border-2 border-[#e0deee] rounded-md"
                } p-3 rounded-md w-28`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
        <ErrorMessage
          name="working_days"
          component="div"
          className="text-red-500 mt-3"
        />
      </div>

      <div className="flex items-center gap-1 mt-8">
        <p className="text-[#0D1A8B] font-semibold min-w-44">
          Select Opening Hours
        </p>
        <p className="bg-[#CECED7] w-full h-[2px]"></p>
      </div>
      <ServiceHours />
      <div className="mt-10">
        <p className="text-[#0D1A8B] font-semibold  min-w-28">
          Open Public Holidays:
        </p>
        <div className="mt-5 flex">
          <div className="radio">
            <Field
              id="yes-checkbox"
              type="radio"
              name="open_public_holidays"
              value="yes"
            />
            <label htmlFor="yes-checkbox" className="radio-label mr-5">
              Yes
            </label>
          </div>
          <div className="radio">
            <Field
              name="open_public_holidays"
              id="no-checkbox"
              type="radio"
              value="no"
            />
            <label htmlFor="no-checkbox" className="radio-label">
              No
            </label>
          </div>
        </div>
        <ErrorMessage
          name="open_public_holidays"
          component="span"
          className="text-red-500 mt-3 block"
        />
      </div>
      <h2 className=" text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Facilities
      </h2>
      <div className="grid 2xl:grid-cols-4 gap-5  mt-6 lg:grid-cols-3 sm:grid-cols-2">
        {Object.keys(facilities).map((facility) => (
          <div key={facility}>
            <label className="flex text-[#11133D]">
              <Field
                className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                type="checkbox"
                name="facilities"
                value={facility}
              />
              {facility}
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 my-8">
        <img className="w-5" src={plusSign} alt="plus-sign" />
        <button
          onClick={() => openModal(setIsFacilitiesOpen)}
          className="text-[#0D1A8B] underline font-semibold"
        >
          Add More Facility
        </button>
      </div>

      {/* <div className="flex items-center  sm:flex-row flex-col gap-5">
        <input
          type="text"
          placeholder="New Facility"
          name="new-facility"
          value={newFacility}
          onChange={handleNewFacilityChange}
          className="border-[#CECED7] border-2 rounded-md p-3 sm:w-72 w-full sm:mr-0"
        />
        <button
          type="button"
          className="bg-[#0D1A8B] text-white p-3 rounded-md min-w-20 sm:w-auto w-full"
          onClick={handleAddFacility}
        >
          Add
        </button>
      </div> */}
      <h2 className=" text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Company Info
      </h2>
      <div className="w-full flex gap-5 mt-6  flex-col text-[#8891B2] ">
        <div className="w-full">
          <Field
            name="company_logo"
            component={FileInput}
            label="Company Logo"
            accept="image/jpeg, image/png"
            fieldName="company_logo"
            furtherStyles="top-3"
          />
          <p className="mt-2 font-medium">Upload an image of 156x156</p>
        </div>
        <div className="w-full">
          <Field
            name="main_picture"
            component={FileInput}
            label="Company Photos"
            accept="image/jpeg, image/png"
            fieldName="main_picture"
            furtherStyles="top-3"
          />
          {console.log(values)}
          <p className="mt-2 font-medium">Upload an image of 156x156</p>
        </div>
      </div>
      <Modal
        isOpen={isFacilitiesOpen}
        onClose={() => closeModal(setIsFacilitiesOpen)}
        opacity="bg-opacity-40"
        width="md:w-1/2 xl:w-1/3 w-full"
      >
        <FacilitiesModal
          onClick={handleAddFacility}
          value={newFacility}
          onChange={handleNewFacilityChange}
          onClose={() => closeModal(setIsFacilitiesOpen)}
        />
      </Modal>
    </div>
  );
}
