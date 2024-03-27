import React, { useState } from "react";
import { FormField } from "../../components/FormField";
import { FaCheck } from "react-icons/fa";
import { Field, useFormikContext } from "formik";
import { timeZoneOptions } from "../../utils/DropdownOptions";
import { plusSign } from "../../assets";

const BusinessDetails = ({ editable, user }) => {
  const { values, setFieldValue } = useFormikContext();

  const [newFacility, setNewFacility] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(`user.${name}`, value);
  };

  const handleNewFacilityChange = (e) => {
    setNewFacility(e.target.value);
  };

  const handleAddFacility = () => {
    if (newFacility.trim() !== "") {
      const updatedFacilities = [
        ...values.user.facilities,
        { name: newFacility, id: values.user.facilities.length + 1 },
      ];
      setFieldValue("user.facilities", updatedFacilities);
      setNewFacility(""); // Clear input field after adding the facility
    }
  };
  return (
    <>
      <div className="w-full mb-4">
        <label
          className="block text-[#8891B2] text-sm font-medium"
          htmlFor={"timezone"}
        >
          Timezone
        </label>
        <Field
          onChange={(e) => handleInputChange(e)}
          value={values.user.timezone}
          disabled={!editable}
          as="select"
          className={`border-b-2 text-sm font-semibold outline-none ${
            !editable ? "border-[#f1f1f1]" : "border-[#000]"
          }  py-2 px-0 text-[#11133D] w-full`}
          name={"timezone"}
        >
          <option>Select a {"Timezone"}</option>
          {timeZoneOptions.map((option) => (
            <option key={option.id} value={option.id} label={option.name}>
              {option.name}
            </option>
          ))}
        </Field>
      </div>
      <label className="block text-[#8891B2] text-sm font-medium">
        Selected Days
      </label>
      <div className="flex gap-4 items-center mt-4 flex-wrap">
        {values.user.working_days.map(({ day, id }) => {
          return (
            <p
              key={id}
              className="bg-[#0D1A8B] smallLg:text-base text-sm text-white py-2 text-center min-w-24 px-4 rounded-lg"
            >
              {day}
            </p>
          );
        })}
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Opening Hours
      </label>
      <div className="grid sm:grid-cols-2 gap-4 mt-4 smallLg:text-base text-sm">
        {values.user.service_hours.map((item, index) => {
          {
            return item.start_time !== null && item.end_time !== null ? (
              <div key={index} className="flex items-center gap-6 font-medium">
                <p className="uppercase">{item.day}</p>
                <p>
                  {item.start_time} - {item.end_time}
                </p>
              </div>
            ) : null;
          }
        })}
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Public Holidays
      </label>
      {editable ? (
        <div className="mt-5 flex">
          <div className="radio">
            <Field
              id="yes-checkbox"
              type="radio"
              name="open_public_holidays"
              onChange={(e) => handleInputChange(e)}
              value="yes"
              checked={values.user.open_public_holidays == "yes"}
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
              onChange={(e) => handleInputChange(e)}
              // value={`${values.user.open_public_holidays}`}
              value="no"
              checked={values.user.open_public_holidays == "no"}
            />
            <label htmlFor="no-checkbox" className="radio-label">
              No
            </label>
          </div>
        </div>
      ) : (
        <p className="font-medium mt-2 capitalize">
          {values.user.open_public_holidays}
        </p>
      )}

      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Facilities
      </label>

      <div className="grid sm:grid-cols-3 mt-3 gap-4">
        {values.user?.facilities.map(({ name, id }) => {
          return (
            <p
              key={id}
              className="flex items-center gap-2 font-medium smallLg:text-base text-sm"
            >
              <FaCheck color="#0D1A8B" /> {name}
            </p>
          );
        })}
      </div>
      {editable ? (
        <div>
          <div className="flex items-center gap-4 my-8">
            <img className="w-5" src={plusSign} alt="plus-sign" />
            <p className="text-[#0D1A8B] underline font-semibold">
              Add More Facility
            </p>
          </div>
          <div className="flex items-center  sm:flex-row flex-col gap-5">
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
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BusinessDetails;
