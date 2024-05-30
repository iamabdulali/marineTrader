import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import SelectDropdown from "./FormElements/SelectDropdown";
import { timeZoneOptions } from "../../utils/DropdownOptions";
import FileInput from "./FormElements/FileInput";
import Heading from "../Heading";
import ServiceHours from "./FormElements/ServiceHours";
import Facilities from "./FormElements/Facilities";
import DaysSelection from "./FormElements/DaysSelection";

export default function TradeSellerServiceHoursForm() {
  const { values, setValues } = useFormikContext();

  return (
    <div className="md:mx-8 mx-3 text-sm">
      <Heading content="Business Details" />
      <div className="2xl:w-1/2  mt-5">
        <label className=" inline-block w-full">
          Time Zone
          <SelectDropdown
            name="timezone"
            options={timeZoneOptions}
            className="border-[#CECED7] sm:appearance-auto appearance-none border-2 text-[#8891B2] rounded-md p-3 w-full mt-3 mb-2"
          />
        </label>
        <ErrorMessage
          name="timezone"
          component="span"
          className="text-red-500"
        />
      </div>
      <DaysSelection values={values} setValues={setValues} />
      <div className="flex items-center gap-1 mt-8">
        <p className="text-[#0D1A8B] font-semibold min-w-44">
          Select Opening Hours
        </p>
        <p className="bg-[#CECED7] w-full h-[2px]"></p>
      </div>
      <ServiceHours
        working_days={values?.working_days}
        service_hours={values?.service_hours}
        values={values}
        setValues={setValues}
      />
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
      <Facilities />
      {console.log(values)}
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
            label="Company Photo"
            accept="image/jpeg, image/png"
            fieldName="main_picture"
            furtherStyles="top-3"
          />
          <p className="mt-2 font-medium">Upload an image of 156x156</p>
        </div>
      </div>
    </div>
  );
}
