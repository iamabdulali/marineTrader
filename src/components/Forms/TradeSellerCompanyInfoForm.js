import React, { useEffect, useState } from "react";
import { eye } from "../../assets";
import { FaChevronDown, FaEye } from "react-icons/fa";
import { Field, ErrorMessage } from "formik";
import SelectDropdown from "./FormElements/SelectDropdown";
import {
  countryOptions,
  currencyOptions,
  regionOptions,
} from "../../utils/DropdownOptions";
import Heading from "../Heading";
import { fetchOptions } from "../../utils/fetch/fetchData";

export default function TradeSellerCompanyInfoForm() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    fetchOptions("currencies", setCurrency);
  }, []);

  const togglePasswordVisibility = (field) => {
    if (field === 1) {
      setShowPassword1(!showPassword1);
    } else if (field === 2) {
      setShowPassword2(!showPassword2);
    }
  };

  return (
    <div className="md:mx-8 mx-0 ">
      <Heading content="Company Info" />
      {/* Left side (Form) */}
      <div className="flex flex-col gap-4 text-[#8891B2] text-sm my-8">
        {/* Form rows */}
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              type="text"
              placeholder="User Name"
              name="user_name"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <div>
              <ErrorMessage
                component="span"
                name="user_name"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="w-full">
            <Field
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              type="text"
              placeholder="Company Name"
              name="company_name"
            />
            <ErrorMessage
              name="company_name"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              name="building_number"
              type="text"
              placeholder="Building Number"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="building_number"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              name="street_name"
              type="text"
              placeholder="Street Name"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="street_name"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              name="city"
              type="text"
              placeholder="Town/City"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="city"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              name="postcode"
              type="text"
              placeholder="Postal Code"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="postcode"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full ">
            <div className="flex items-center">
              <FaChevronDown
                className="absolute right-6 block sm:hidden"
                size={12}
              />
              <SelectDropdown
                name="country"
                options={countryOptions}
                className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none sm:appearance-auto bg-white"
              />
            </div>
            <ErrorMessage
              name="country"
              component="span"
              className="text-red-500"
            />
          </div>

          <div className="w-full ">
            <div className="items-center flex">
              <FaChevronDown
                className="absolute right-6 block sm:hidden"
                size={12}
              />
              <SelectDropdown
                name="region"
                options={regionOptions}
                className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none sm:appearance-auto bg-white"
              />
            </div>
            <ErrorMessage
              name="region"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full relative">
            {/* Country Code Dropdown */}
            <div className="flex items-center">
              <div className="absolute left-3 flex items-center ">
                <Field
                  as="select"
                  name="countryCode"
                  className="rounded-md py-2 w-full appearance-none sm:appearance-auto bg-white"
                >
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                </Field>
                <FaChevronDown className=" block sm:hidden" size={12} />
              </div>

              {/* Phone Number Input */}
              <div className="w-full">
                <Field
                  type="tel"
                  name="phone_no"
                  placeholder="7700900077"
                  className="border-[#CECED7] border-2 rounded-md p-3 pl-24 sm:pl-28 w-full bg-white"
                />
              </div>
            </div>
            <ErrorMessage
              name="phone_no"
              component="span"
              className="text-red-500"
            />
          </div>

          <div className="w-full">
            <div className="flex items-center">
              <FaChevronDown
                className="absolute right-6 block sm:hidden"
                size={12}
              />
              <SelectDropdown
                name="currency"
                options={currency}
                className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none sm:appearance-auto bg-white"
              />
            </div>
            <ErrorMessage
              name="currency"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              type="email"
              placeholder="Email Address"
              name="email"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              type="email"
              placeholder="Confirm Email Address"
              name="confirmEmail"
            />
            <ErrorMessage
              name="confirmEmail"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="relative w-full">
            <Field
              type={showPassword1 ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <img
              src={eye}
              alt="Toggle password visibility"
              className={`absolute right-3 top-4 w-5 cursor-pointer ${
                showPassword1 ? "hidden" : "block"
              }`}
              onClick={() => togglePasswordVisibility(1)}
            />
            <span
              onClick={() => togglePasswordVisibility(1)}
              className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
                showPassword1 ? "block" : "hidden"
              }`}
            >
              {" "}
              <FaEye size={20} color="#11133D" />
            </span>
            <ErrorMessage
              name="password"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="relative w-full">
            <Field
              name="confirmPassword"
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <img
              src={eye}
              alt="Toggle password visibility"
              className={`absolute right-3 top-4 w-5 cursor-pointer ${
                showPassword2 ? "hidden" : "block"
              }`}
              onClick={() => togglePasswordVisibility(2)}
            />
            <span
              onClick={() => togglePasswordVisibility(2)}
              className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
                showPassword2 ? "block" : "hidden"
              }`}
            >
              {" "}
              <FaEye size={20} color="#11133D" />
            </span>
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        {/* Password strength requirements */}
        <li className="text-sm sm:w-6/12 sm:-indent-5">
          Password must contain a special character, capital letter, and number
        </li>
      </div>
    </div>
  );
}
