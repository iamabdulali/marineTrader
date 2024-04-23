import React, { useEffect, useState } from "react";
import { GetCountries } from "react-country-state-city/dist/cjs";
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkedAlt,
  FaPhone,
} from "react-icons/fa";

const CompanyInformation = ({ phone_no, email, city, country }) => {
  const [countries, setCountries] = useState([]);

  function getCountry(countryName) {
    const country = countries.find((country) => country?.id == countryName);
    return country;
  }

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
  }, []);

  return (
    <div className="bg-white sm:p-5 py-7 px-3 lg:w-5/12 w-full rounded-lg shadow-[7px] ">
      <p className="font-semibold  block mb-4">Company Contact Information:</p>
      <div className="flex items-start gap-3">
        <FaMapMarkedAlt size={30} color="#8891B2" />
        <p className="text-[#8891B2] text-sm">
          {city}, {getCountry(country)?.name}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <FaEnvelope color="#8891B2" size={17} />
        <p className="text-[#8891B2] text-sm">{email}</p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <FaPhone color="#8891B2" size={17} />
        <p className="text-[#8891B2] text-sm">{phone_no}</p>
      </div>
      {/* <div className="flex items-center gap-3 mt-4">
        <FaInstagram color="#8891B2" size={20} />
        <p className="text-[#8891B2] text-sm">@Marinetrader_com</p>
      </div> */}
    </div>
  );
};

export default CompanyInformation;
