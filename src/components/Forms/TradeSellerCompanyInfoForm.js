import React, { useState } from "react";
import { eye } from "../../assets";
import { FaEye } from "react-icons/fa";
import { Field, ErrorMessage } from "formik";

export default function TradeSellerCompanyInfoForm() {
  const [aboutCompany, setAboutCompany] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 1) {
      setShowPassword1(!showPassword1);
    } else if (field === 2) {
      setShowPassword2(!showPassword2);
    }
  };

  const handleAboutCompanyChange = (e) => {
    const FieldValue = e.target.value;
    if (FieldValue.length <= 250) {
      setAboutCompany(FieldValue);
    }
  };

  return (
    <div className="sm:mx-8 mx-3 ">
      <h2 className=" text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Company Info
      </h2>
      {/* Left side (Form) */}
      <div className="flex flex-col gap-4 text-[#8891B2] text-sm my-8">
        {/* Form rows */}
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              type="text"
              placeholder="Company Name"
              name="companyName"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <div>
              <ErrorMessage
                component="span"
                name="companyName"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="w-full">
            <Field
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              type="text"
              placeholder="Website Address"
              name="websiteAddress"
            />
            <ErrorMessage
              name="websiteAddress"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="relative">
          <textarea
            placeholder="About Company"
            name="aboutCompany"
            value={aboutCompany}
            onChange={handleAboutCompanyChange}
            className="border-[#CECED7] border-2 rounded-md p-3 w-full resize-none h-40"
          />
          <p className="absolute bottom-4 right-5 text-sm">
            {aboutCompany.length}/250
          </p>
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              name="buildingNumber"
              type="text"
              placeholder="Building Number"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="buildingNumber"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              name="streetName"
              type="text"
              placeholder="Street Name"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="streetName"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              name="townCity"
              type="text"
              placeholder="Town/City"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="townCity"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              name="postcode"
              type="text"
              placeholder="Postcode"
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
          <div className="w-full">
            <Field
              as="select"
              name="country"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            >
              {/* Add options for countries in Europe */}
              <option value="" label="Select a country" />
              <option value="AL" label="Albania" />
              <option value="AD" label="Andorra" />
              <option value="AT" label="Austria" />
              <option value="BY" label="Belarus" />
              <option value="BE" label="Belgium" />
              <option value="BA" label="Bosnia and Herzegovina" />
              <option value="BG" label="Bulgaria" />
              <option value="HR" label="Croatia" />
              <option value="CY" label="Cyprus" />
              <option value="CZ" label="Czech Republic" />
              <option value="DK" label="Denmark" />
              <option value="EE" label="Estonia" />
              <option value="FI" label="Finland" />
              <option value="FR" label="France" />
              <option value="DE" label="Germany" />
              <option value="GR" label="Greece" />
              <option value="HU" label="Hungary" />
              <option value="IS" label="Iceland" />
              <option value="IE" label="Ireland" />
              <option value="IT" label="Italy" />
              <option value="XK" label="Kosovo" />
              <option value="LV" label="Latvia" />
              <option value="LI" label="Liechtenstein" />
              <option value="LT" label="Lithuania" />
              <option value="LU" label="Luxembourg" />
              <option value="MK" label="North Macedonia" />
              <option value="MT" label="Malta" />
              <option value="MD" label="Moldova" />
              <option value="MC" label="Monaco" />
              <option value="ME" label="Montenegro" />
              <option value="NL" label="Netherlands" />
              <option value="NO" label="Norway" />
              <option value="PL" label="Poland" />
              <option value="PT" label="Portugal" />
              <option value="RO" label="Romania" />
              <option value="RU" label="Russia" />
              <option value="SM" label="San Marino" />
              <option value="RS" label="Serbia" />
              <option value="SK" label="Slovakia" />
              <option value="SI" label="Slovenia" />
              <option value="ES" label="Spain" />
              <option value="SE" label="Sweden" />
              <option value="CH" label="Switzerland" />
              <option value="TR" label="Turkey" />
              <option value="UA" label="Ukraine" />
              <option value="GB" label="United Kingdom" />
              <option value="VA" label="Vatican City" />
              {/* ... */}
            </Field>
            <ErrorMessage
              name="country"
              component="span"
              className="text-red-500"
            />
          </div>

          <div className="w-full">
            <Field
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="phoneNumber"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="w-full">
            <Field
              as="select"
              name="timezone"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            >
              {/* Add options for countries in Europe */}
              <option value="" label="Select a timezone" />
              <option value="Europe/London" label="London (GMT)" />
              <option value="Europe/Paris" label="Paris (GMT+1)" />
              <option value="Europe/Berlin" label="Berlin (GMT+1)" />
              <option value="Europe/Madrid" label="Madrid (GMT+1)" />
              <option value="Europe/Rome" label="Rome (GMT+1)" />
              <option value="Europe/Amsterdam" label="Amsterdam (GMT+1)" />
              <option value="Europe/Brussels" label="Brussels (GMT+1)" />
              <option value="Europe/Oslo" label="Oslo (GMT+1)" />
              <option value="Europe/Stockholm" label="Stockholm (GMT+1)" />
              <option value="Europe/Copenhagen" label="Copenhagen (GMT+1)" />
              <option value="Europe/Warsaw" label="Warsaw (GMT+1)" />
              <option value="Europe/Prague" label="Prague (GMT+1)" />
              <option value="Europe/Budapest" label="Budapest (GMT+1)" />
              <option value="Europe/Athens" label="Athens (GMT+2)" />
              <option value="Europe/Istanbul" label="Istanbul (GMT+3)" />
              <option value="Europe/Moscow" label="Moscow (GMT+3)" />
              <option value="Europe/Helsinki" label="Helsinki (GMT+2)" />
              <option value="Europe/Bratislava" label="Bratislava (GMT+1)" />
              <option value="Europe/Vienna" label="Vienna (GMT+1)" />
              <option value="Europe/Lisbon" label="Lisbon (GMT)" />
              <option value="Europe/Dublin" label="Dublin (GMT)" />
              {/* ... */}
            </Field>
            <ErrorMessage
              name="timezone"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <Field
              name="emailAddress"
              type="email"
              placeholder="Email Address"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <ErrorMessage
              name="emailAddress"
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
