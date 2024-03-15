import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import FileInput from "./FormElements/FileInput";
import { FaChevronCircleDown, FaChevronDown, FaEye } from "react-icons/fa";
import SelectDropdown from "./FormElements/SelectDropdown";
import {
  countryOptions,
  currencyOptions,
  regionOptions,
} from "../../utils/DropdownOptions";
import { eye } from "../../assets";
import { fetchOptions } from "../../utils/fetch/fetchData";

const PrivateSellerSignUpForm = ({ setFieldValue, values }) => {
  const togglePasswordVisibility = (field, setFieldValue, values) => {
    setFieldValue(`showPassword${field}`, !values[`showPassword${field}`]);
  };
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    fetchOptions("currencies", setCurrency, setLoading);
  }, []);
  return (
    <>
      {/* Form rows */}
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <Field
            type="text"
            name="name"
            placeholder="Full Name"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="name"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>
        <div className="w-full">
          <Field
            type="text"
            name="user_name"
            placeholder="User Name"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="user_name"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>
      </div>

      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <Field
            type="text"
            name="building_number"
            placeholder="Building Number"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="building_number"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>
        <div className="w-full">
          <Field
            type="text"
            name="street_name"
            placeholder="Street Name"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="street_name"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>
      </div>

      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <Field
            type="text"
            name="city"
            placeholder="Town/City"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="city"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>
        <div className="w-full">
          <Field
            type="text"
            name="postcode"
            placeholder="Postal Code"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <ErrorMessage
            name="postcode"
            component="p"
            className="text-red-500 mt-1 ml-2"
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
                placeholder="00000000000"
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
            type={values.showPassword1 ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <img
            src={eye}
            alt="Toggle password visibility"
            className={`absolute right-3 top-4 w-5 cursor-pointer ${
              values.showPassword1 ? "hidden" : "block"
            }`}
            onClick={() => togglePasswordVisibility(1, setFieldValue, values)}
          />
          <span
            onClick={() => togglePasswordVisibility(1, setFieldValue, values)}
            className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
              values.showPassword1 ? "block" : "hidden"
            }`}
          >
            {" "}
            <FaEye size={20} color="#11133D" />
          </span>
          <ErrorMessage
            name="password"
            component="p"
            className="text-red-500 mt-1 ml-2"
          />
        </div>

        <div className="relative w-full">
          <Field
            type={values.showPassword2 ? "text" : "password"}
            name="password2"
            placeholder="Confirm Password"
            className={`border-[#CECED7] border-2 rounded-md p-3 w-full`}
          />
          <img
            src={eye}
            alt="Toggle password visibility"
            className={`absolute right-3 top-4 w-5 cursor-pointer ${
              values.showPassword2 ? "hidden" : "block"
            }`}
            onClick={() => togglePasswordVisibility(2, setFieldValue, values)}
          />
          <span
            onClick={() => togglePasswordVisibility(2, setFieldValue, values)}
            className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
              values.showPassword2 ? "block" : "hidden"
            }`}
          >
            {" "}
            <FaEye size={20} color="#11133D" />
          </span>
        </div>
      </div>

      {/* Password strength requirements */}
      <li className="text-sm sm:w-6/12 sm:-indent-5">
        Password must contain a special character, capital letter, and number
      </li>

      <div className="w-full">
        {/* <p className="text-[#11133D] font-semibold mb-3">Main Picture</p>
    <div className="border-2 relative rounded border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full p-8">
      <p className="flex items-end mb-3">
        <img src={cloud} alt="upload" className="w-6 mr-3" /> Drag &
        drop or{" "}
        <span className="text-[#0D1A8B] font-medium ml-1 underline">
          {" "}
          Upload Here
        </span>
      </p>
      <p>JPEG/PNG size 160*160 pixels</p>
      <input
        name="imageField"
        type="file"
        className="absolute bg-slate-500 inset-0 opacity-0 cursor-pointer"
      />
    </div> */}
        <Field
          name="image_field"
          component={FileInput}
          label="Main Picture"
          accept="image/jpeg, image/png"
        />
      </div>
    </>
  );
};

export default PrivateSellerSignUpForm;
