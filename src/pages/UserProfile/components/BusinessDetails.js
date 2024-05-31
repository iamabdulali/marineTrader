import React from "react";
import { Field, useFormikContext } from "formik";
import { timeZoneOptions } from "../../../utils/DropdownOptions";
import ServiceHours from "../../../components/Forms/FormElements/ServiceHours";
import Facilities from "./Facilities";
import SelectDays from "./SelectDays";

const BusinessDetails = ({ editable }) => {
  const { values, setFieldValue, setValues } = useFormikContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(`user.${name}`, value);
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
          className={`border-b-2 text-sm font-semibold outline-none sm:appearance-auto appearance-none ${
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
      <SelectDays
        values={values}
        editable={editable}
        setFieldValue={setFieldValue}
      />

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
      {editable ? (
        <ServiceHours
          service_hours={values?.user.service_hours}
          values={values}
          setValues={setValues}
          working_days={values?.user.working_days}
          isUserProfilePage={true}
        />
      ) : (
        ""
      )}
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

      <Facilities
        values={values}
        editable={editable}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

export default BusinessDetails;
