import React, { useContext, useEffect, useState } from "react";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";

const CountriesDropdown = ({ setCountryCode, dispatch }) => {
  const { spotlightCountries } = useContext(AuthContext);

  console.log(spotlightCountries);

  const flagImage =
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/";

  return (
    <div className="absolute z-[100] max-h-80 overflow-y-auto bg-white custom-shadow rounded-lg px-2 pt-2 min-w-48 sm:right-0">
      {spotlightCountries.map(({ name, country_code }) => (
        <div
          key={name}
          onClick={() => {
            setCountryCode(country_code);
            dispatch({ type: "SELECTED_COUNTRY", payload: name });
          }}
          onTouchStart={() => {
            setCountryCode(country_code);
            dispatch({ type: "SELECTED_COUNTRY", payload: name });
          }}
        >
          <label className="flex cursor-pointer items-center gap-2 text-[#11133D] whitespace-nowrap mb-2 text-sm font-medium">
            <img
              src={`${flagImage}${country_code}.svg`}
              alt={`${name} flag`}
              className="w-6 h-6"
            />
            {name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CountriesDropdown;
