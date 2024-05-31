import axios from "axios";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { getPhoneCodeByCountryName } from "../../../utils/getPhoneCodeByCountryName";

function CountryRegionFields({
  values,
  editable,
  countries,
  onRegionChangeFunction,
  setFieldValue,
}) {
  const [states, setStates] = useState([]);
  const [statesByCountries, setStatesByCountries] = useState([]);

  const getOptions = async (url, setData) => {
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOptions(
      "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json",
      setStates
    );
  }, []);

  function getCountry(countryName) {
    const country = countries.find((country) => country?.id == countryName);
    return country;
  }

  function getState(stateID) {
    const state = statesByCountries?.find((state) => state?.id == stateID);
    return state;
  }

  function getStatesByCountry(countryId) {
    const statesByCountries = states?.find((state) => state?.id == countryId);
    setStatesByCountries(statesByCountries?.states);
  }

  useEffect(() => {
    getStatesByCountry(values.user.country);
  }, [editable, states, countries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(`user.${name}`, value);
  };

  return (
    <>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col w-full">
        <div className="w-full mb-4">
          <label
            className="block text-[#8891B2] text-sm font-medium"
            htmlFor={"country"}
          >
            Country
          </label>
          <Field
            onChange={(e) => {
              handleInputChange(e);
              getStatesByCountry(e.target.value);
              setFieldValue(
                "user.calling_code",
                getPhoneCodeByCountryName(
                  countries,
                  getCountry(e.target.value).id
                )
              );
            }}
            value={getCountry(values.user.country)?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none sm:appearance-auto appearance-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"country"}
          >
            <option>Select a country</option>
            {countries?.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Field>
        </div>
        <div className="w-full mb-4">
          <label
            className="block text-[#8891B2] text-sm font-medium"
            htmlFor={"region"}
          >
            Region
          </label>
          <Field
            onChange={onRegionChangeFunction}
            value={getState(values.user.region)?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none sm:appearance-auto appearance-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"region"}
          >
            <option>Select a region</option>
            {statesByCountries?.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Field>
        </div>
      </div>
    </>
  );
}

export default CountryRegionFields;
