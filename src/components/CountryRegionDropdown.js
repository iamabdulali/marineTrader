import axios from "axios";
import { ErrorMessage, Field, useFormikContext } from "formik";

import { useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { FaChevronDown } from "react-icons/fa";
import PlaceApi from "./Forms/PlaceApi";

const CountryRegionDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [statesByCountries, setStatesByCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [cityByStates, setCitiesByStates] = useState([]);
  const [customCity, setCustomCity] = useState(false);

  const { values, setFieldValue } = useFormikContext();

  const getOptions = async (url, setData) => {
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
    getOptions(
      "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json",
      setStates
    );

    // getOptions(
    //   "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json",
    //   setCities
    // );
  }, []);

  function getStatesByCountry(countryId) {
    const statesByCountries = states.find((state) => state.id == countryId);
    setStatesByCountries(statesByCountries.states);
  }

  function getCountry(countryName) {
    const country = countries.find((country) => country.id == countryName);
    return country;
  }

  function getState(stateID) {
    const state = statesByCountries.find((state) => state.id == stateID);
    return state;
  }

  // useEffect(() => {
  //   setAllStates((prevStates) => {
  //     const newStates = cities.reduce((acc, city) => {
  //       return acc.concat(Object(city).states);
  //     }, []);

  //     return [...prevStates, ...newStates];
  //   });
  // }, [cities]);

  // function getCitiesByStates(stateID) {
  //   const selectedCities = AllStates.find((state) => state.id == stateID);
  //   setCitiesByStates(selectedCities.cities);
  // }

  console.log(values);

  return (
    <>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <div className="flex items-center">
            <FaChevronDown
              className="absolute right-6 block sm:hidden"
              size={12}
            />
            <Field
              value={values.country}
              as="select"
              name="country"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none sm:appearance-auto bg-white"
              onChange={(e) => {
                getStatesByCountry(e.target.value);
                setFieldValue("country", getCountry(e.target.value).id);
                // setFieldValue("city", "");
                setFieldValue("region", "");
              }}
            >
              <option>Select a Country</option>
              {countries.map(({ name, id }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Field>
          </div>
          <ErrorMessage
            name="country"
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
            <Field
              value={values?.region}
              name="region"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none sm:appearance-auto bg-white"
              as="select"
              onChange={(e) => {
                setFieldValue("region", getState(e.target.value).id);
              }}
            >
              <option>Select a Region</option>
              {statesByCountries.map(({ name, id }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Field>
          </div>
          <ErrorMessage
            name="region"
            component="span"
            className="text-red-500"
          />
        </div>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          {/* <div className="flex items-center relative">
            {customCity ? (
              <button
                onClick={() => setCustomCity(false)}
                type="button"
                className="absolute right-4 block text-sm underline"
              >
                Go Back
              </button>
            ) : (
              <button
                onClick={() => setCustomCity(true)}
                type="button"
                className="absolute right-4 block text-sm underline"
              >
                Add City
              </button>
            )}

            {customCity ? (
              <Field
                type="text"
                name="city"
                placeholder="Write City Here"
                className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none  bg-white"
              />
            ) : (
              <Field
                as="select"
                name="city"
                className="border-[#CECED7] border-2 rounded-md p-3 w-full appearance-none  bg-white"
              >
                <option>Select a City</option>
                {cityByStates?.map(({ name, id }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </Field>
            )}
          </div> */}
          <PlaceApi />

          {/* <ErrorMessage name="city" component="span" className="text-red-500" /> */}
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
    </>
  );
};

export default CountryRegionDropdown;
