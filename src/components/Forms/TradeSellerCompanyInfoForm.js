import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Field, ErrorMessage, useFormikContext } from "formik";
import SelectDropdown from "./FormElements/SelectDropdown";
import Heading from "../Heading";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { GetCountries } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import CountryRegionDropdown from "../CountryRegionDropdown";
import PhoneNumberField from "./FormElements/PhoneNumberField";
import PasswordFields from "./FormElements/PasswordFields";

export default function TradeSellerCompanyInfoForm({ sellerType }) {
  const [currency, setCurrency] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetchOptions("currencies", setCurrency);
    GetCountries().then((result) => {
      setCountries(result);
    });
  }, []);

  const { values } = useFormikContext();

  const seller_type = sellerType == "trade" ? true : false;

  return (
    <div className={`${seller_type ? "md:mx-8" : "md:mx-0"}  mx-0`}>
      {seller_type ? <Heading content="Company Info" /> : ""}
      <div
        className={`flex flex-col gap-4 text-[#8891B2] text-sm ${
          sellerType ? "my-8" : "my-0"
        }`}
      >
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
              placeholder={`${seller_type ? "Company Name" : "Your Name"}`}
              name={`${seller_type ? "company_name" : "name"}`}
            />
            <ErrorMessage
              name={`${seller_type ? "company_name" : "name"}`}
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
        <CountryRegionDropdown />
        <div className="flex gap-4 sm:flex-row flex-col">
          <PhoneNumberField
            countries={countries}
            countryField={values?.calling_code}
          />
          <div className="w-full">
            <div className="flex items-center">
              <FaChevronDown
                className="absolute right-6 block sm:hidden"
                size={12}
              />
              <SelectDropdown
                isCurrencyField={true}
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
        <PasswordFields />
      </div>
    </div>
  );
}
