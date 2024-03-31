import React from "react";

const CountriesDropdown = ({ setCountryCode, dispatch }) => {
  const flagImage =
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/";
  const countryData = [
    { name: "United Kingdom", flag: `${flagImage}GB.svg`, countryCode: "GB" },
    { name: "France", flag: `${flagImage}FR.svg`, countryCode: "FR" },
    { name: "Germany", flag: `${flagImage}DE.svg`, countryCode: "DE" },
    { name: "Pakistan", flag: `${flagImage}PK.svg`, countryCode: "PK" },
  ];
  return (
    <div className="absolute bg-white custom-shadow rounded-lg px-2 pt-2 min-w-40 sm:right-0">
      {countryData.map(({ name, flag, countryCode }) => (
        <div
          key={name}
          onClick={() => {
            setCountryCode(countryCode);
            dispatch({ type: "SELECTED_COUNTRY", payload: name });
            alert("HELO");
          }}
        >
          <label className="flex cursor-pointer items-center gap-2 text-[#11133D] whitespace-nowrap mb-2 text-sm font-medium">
            <img src={flag} alt={`${name} flag`} className="w-6 h-6" />
            {name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CountriesDropdown;
