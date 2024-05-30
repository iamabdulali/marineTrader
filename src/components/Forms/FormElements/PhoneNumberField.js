import { ErrorMessage, Field } from "formik";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

function PhoneNumberField({ countryField, countries }) {
  return (
    <div className="w-full relative">
      {/* Country Code Dropdown */}
      <div className="flex items-center">
        <div className="absolute left-2 flex items-center ">
          <Field
            value={countryField}
            as="select"
            name="calling_code"
            className="rounded-md py-2 w-full appearance-none sm:appearance-auto bg-white"
          >
            {countries.map(({ phone_code, iso2, id }) => {
              return (
                <option key={id} value={phone_code}>
                  + {phone_code} ({iso2})
                </option>
              );
            })}
          </Field>
          <FaChevronDown className=" block sm:hidden" size={12} />
        </div>

        {/* Phone Number Input */}
        <div className="w-full">
          <Field
            type="tel"
            name="phone_no"
            placeholder="7700900077"
            className="border-[#CECED7] border-2 rounded-md p-3 pl-28 w-full bg-white"
          />
        </div>
      </div>
      <ErrorMessage name="phone_no" component="span" className="text-red-500" />
    </div>
  );
}

export default PhoneNumberField;
