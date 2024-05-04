import React, { useContext, useEffect, useState } from "react";
import { FormField } from "../../components/FormField";
import { Field, useFormikContext } from "formik";
import SelectDropdown from "../../components/SelectDropdown";
import { AuthContext } from "../../Context/AuthContext";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { countryOptions, regionOptions } from "../../utils/DropdownOptions";
import { GetCountries } from "react-country-state-city/dist/cjs";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const CompanyInfo = ({ editable, isPrivateSeller }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [statesByCountries, setStatesByCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [cityByStates, setCitiesByStates] = useState([]);

  const { currency } = useContext(AuthContext);

  const { values, setFieldValue } = useFormikContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For the currency field, extract the ID from the selected currency object
    if (name === "currency") {
      const selectedCurrency = currency.find((c) => c.id === parseInt(value));
      console.log(selectedCurrency);
      if (selectedCurrency) {
        setFieldValue("user.currency", selectedCurrency?.id);
      } else {
        console.error("Selected currency not found");
      }
    } else {
      setFieldValue(`user.${name}`, value);
    }

    console.log(values);
  };

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

  function getCountry(countryName) {
    console.log(countryName);
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

  // useEffect(() => {
  //   setAllStates((prevStates) => {
  //     const newStates = cities?.reduce((acc, city) => {
  //       return acc.concat(Object(city)?.states);
  //     }, []);

  //     return [...prevStates, ...newStates];
  //   });
  // }, [cities]);

  // function getCitiesByStates(stateID) {
  //   const selectedCities = AllStates?.find((state) => state?.id == stateID);
  //   setCitiesByStates(selectedCities?.cities);
  // }

  // function getCity(ID) {
  //   const city = cityByStates?.find((city) => city?.id == ID);
  //   return city;
  // }

  useEffect(() => {
    getStatesByCountry(values.user.country);
    // getCitiesByStates(values.user.region);
    // getCity(values.user.city);
  }, [editable, states, countries, AllStates]);

  function getPhoneCodeByCountryName(countryName) {
    const country = countries.find((country) => country.id == countryName);
    console.log(country);
    return country ? country?.phone_code : null;
  }

  return (
    <>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        {isPrivateSeller ? (
          <FormField
            label="Name"
            FieldType="text"
            inputField={false}
            value={values.user.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            readOnly={true}
          />
        ) : (
          <FormField
            label="Company Name"
            FieldType="text"
            inputField={false}
            value={values.user.company_name}
            name="company_name"
            onChange={(e) => handleInputChange(e)}
            readOnly={!editable}
          />
        )}
        <FormField
          label="Username"
          FieldType="text"
          inputField={false}
          value={values.user.user_name}
          name="user_name"
          onChange={(e) => handleInputChange(e)}
          readOnly={true}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Building Number"
          FieldType="text"
          inputField={false}
          value={values.user.building_number}
          name="building_number"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
        />
        <FormField
          label="Street Name"
          FieldType="text"
          inputField={false}
          value={values.user.street_name}
          name="street_name"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
        />
      </div>

      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
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
                getPhoneCodeByCountryName(getCountry(e.target.value).id)
              );
              console.log(getCountry(e.target.value).id);
            }}
            value={getCountry(values.user.country)?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"country"}
          >
            <option>Select a {"country"}</option>
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
            onChange={(e) => {
              handleInputChange(e);
              // getCitiesByStates(e.target.value);
            }}
            value={getState(values.user.region)?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"region"}
          >
            <option>Select a {"Region"}</option>
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
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Town/City"
          FieldType="text"
          inputField={false}
          value={values.user.city}
          name="city"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
        />
        {/* <div className="w-full mb-4">
          <label
            className="block text-[#8891B2] text-sm font-medium"
            htmlFor={"country"}
          >
            City
          </label>
          <Field
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={getCity(values.user.city)?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"city"}
          >
            <option>Select a {"City"}</option>
            {cityByStates?.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Field>
        </div> */}
        <FormField
          label="Postal Code"
          FieldType="text"
          inputField={false}
          value={values.user.postcode}
          name="postcode"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col relative">
        <div className="absolute left-0 sm:top-auto top-[14%] flex items-center ">
          <Field
            value={getPhoneCodeByCountryName(values?.user.country)}
            as="select"
            name="calling_code"
            // disabled={true}
            className="rounded-md py-2 callingCode w-full appearance-none text-sm bg-white"
          >
            {countries.map(({ phone_code, iso2, id }) => {
              return (
                <option key={id} value={phone_code}>
                  + {phone_code} ({iso2})
                </option>
              );
            })}
          </Field>
        </div>
        <FormField
          label="Phone Number"
          FieldType="tel"
          inputField={false}
          value={values.user.phone_no}
          name="phone_no"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
          padding={true}
        />

        <div className="w-full mb-4">
          <label
            className="block text-[#8891B2] text-sm font-medium"
            htmlFor={"currency"}
          >
            Currency
          </label>
          <Field
            onChange={(e) => handleInputChange(e)}
            value={values.user?.currency?.id}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"currency"}
          >
            <option>Select a {"currency"}</option>
            {currency.map((option) => (
              <option key={option.id} value={option.id} label={option.name}>
                {option.name}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Email"
          FieldType="email"
          inputField={false}
          value={values.user.email}
          name="email"
          onChange={(e) => handleInputChange(e)}
          readOnly={true}
        />
        <FormField
          label="Password"
          FieldType="password"
          inputField={false}
          value="password"
          name="password"
          onChange={(e) => handleInputChange(e)}
          readOnly={true}
        />
      </div>
    </>
  );
};

export default CompanyInfo;
