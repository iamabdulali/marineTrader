import React, { useState } from "react";
import { eye } from "../../assets";

export default function TradeSellerCompanyInfoForm() {
  const [aboutCompany, setAboutCompany] = useState("");

  const handleAboutCompanyChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 250) {
      setAboutCompany(inputValue);
    }
  };

  return (
    <div className="sm:mx-8 mx-3 my-5">
      {/* Left side (Form) */}
      <div className="flex flex-col gap-4 text-[#8891B2] text-sm">
        {/* Form rows */}
        <div className="flex gap-4 sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Company Name"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <input
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            type="text"
            placeholder="Website Address"
          />
        </div>

        <div className="relative">
          <textarea
            placeholder="About Company"
            value={aboutCompany}
            onChange={handleAboutCompanyChange}
            className="border-[#CECED7] border-2 rounded-md p-3 w-full resize-none h-40"
          />
          <p className="absolute bottom-4 right-5 text-sm">
            {aboutCompany.length}/250
          </p>
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Building Number"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <input
            type="text"
            placeholder="Street Name"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Town/City"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <input
            type="text"
            placeholder="Postcode"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <select className="border-[#CECED7] border-2 rounded-md p-3 w-full">
            {/* Add options for countries in Europe */}
            <option>Country 1</option>
            <option>Country 2</option>
            {/* ... */}
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Timezone"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
        </div>

        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Password"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <img
              src={eye}
              className="absolute right-3 top-4 w-5 cursor-pointer"
            />
          </div>
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <img
              src={eye}
              className="absolute right-3 top-4 w-5 cursor-pointer"
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
