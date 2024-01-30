import React from "react";
import Heading from "../../components/Heading";
import { FormField } from "../../components/FormField";
import SelectDropdown from "../../components/Forms/FormElements/SelectDropdown";
import {
  countryOptions,
  currencyOptions,
  regionOptions,
} from "../../utils/DropdownOptions";
import { ErrorMessage, Field } from "formik";
import { FaChevronCircleDown } from "react-icons/fa";

const CompanyInfo = () => {
  const className =
    "border-[#CECED7] text-[#8891B2] text-sm rounded-md p-3 border-2 w-full";
  return (
    <>
      <Heading content="Company Info" className="mt-14" />
      <div className="grid grid-cols-3 mt-8 gap-x-7 gap-y-3">
        <FormField
          inputField={true}
          FieldType="text"
          label="First Name"
          name="firstName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Last Name"
          name="lastName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Job Title"
          name="jobTitle"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="User Name*"
          name="userName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Company Name*"
          name="companyName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Building Name*"
          name="buildingName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Street Name*"
          name="streetName"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Town/City*"
          name="town"
          className={className}
        />
        <FormField
          inputField={true}
          FieldType="text"
          label="Post Code*"
          name="postCode"
          className={className}
        />
        <div>
          <label
            className="block text-[#11133D] text-sm font-medium mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <SelectDropdown
            name="country"
            options={countryOptions}
            className={className}
          />
        </div>
        <div>
          <label
            className="block text-[#11133D] text-sm font-medium mb-2"
            htmlFor="region"
          >
            Region
          </label>
          <SelectDropdown
            name="region"
            options={regionOptions}
            className={className}
          />
        </div>
        <div className="w-full relative">
          <label
            className="block text-[#11133D] text-sm font-medium mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <div className="flex items-center">
            <div className="absolute left-3 flex items-center ">
              <Field
                as="select"
                name="countryCode"
                className="rounded-md text-[#8891B2] py-2 w-full appearance-none sm:appearance-auto bg-white"
              >
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
              </Field>
              <FaChevronCircleDown className=" block sm:hidden" size={16} />
            </div>

            {/* Phone Number Input */}
            <div className="w-full">
              <Field
                type="tel"
                name="phoneNumber"
                placeholder="00000000000"
                className="border-[#CECED7] border-2 rounded-md p-3 pl-24 sm:pl-28 w-full bg-white"
              />
            </div>
          </div>
          <ErrorMessage
            name="phoneNo"
            component="span"
            className="text-red-500"
          />
        </div>
        <div>
          <label
            className="block text-[#11133D] text-sm font-medium mb-2"
            htmlFor="currency"
          >
            Currency
          </label>
          <SelectDropdown
            name="currency"
            options={currencyOptions}
            className={className}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
