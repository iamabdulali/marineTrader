import axios from "axios";
import { ErrorMessage, Field, useFormikContext } from "formik";

import { useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const CountryRegionDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [statesByCountries, setStatesByCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [cityByStates, setCitiesByStates] = useState([]);

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

    getOptions(
      "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json",
      setCities
    );
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

  useEffect(() => {
    setAllStates((prevStates) => {
      const newStates = cities.reduce((acc, city) => {
        return acc.concat(Object(city).states);
      }, []);

      return [...prevStates, ...newStates];
    });
  }, [cities]);

  function getCitiesByStates(stateID) {
    const selectedCities = AllStates.find((state) => state.id == stateID);
    setCitiesByStates(selectedCities.cities);
  }

  return (
    <>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <Field
            value={values.country}
            as="select"
            name="country"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            onChange={(e) => {
              getStatesByCountry(e.target.value);
              setFieldValue("country", getCountry(e.target.value).id);
              setFieldValue("city", "");
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
          <ErrorMessage
            name="country"
            component="span"
            className="text-red-500"
          />
        </div>
        <div className="w-full">
          <Field
            value={values?.region}
            name="region"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            as="select"
            onChange={(e) => {
              getCitiesByStates(e.target.value);
              setFieldValue("region", getState(e.target.value).id);
              setFieldValue("city", "");
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
          <ErrorMessage
            name="region"
            component="span"
            className="text-red-500"
          />
        </div>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="w-full">
          <Field
            as="select"
            name="city"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
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
          <ErrorMessage name="city" component="span" className="text-red-500" />
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
