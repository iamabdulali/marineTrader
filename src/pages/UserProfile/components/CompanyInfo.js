import React, { useContext, useEffect, useState } from "react";
import { FormField } from "../../../components/FormField";
import { useFormikContext } from "formik";
import { AuthContext } from "../../../Context/AuthContext";
import { GetCountries } from "react-country-state-city/dist/cjs";
import PlaceApi from "../../../components/Forms/PlaceApi";
import CountryRegionFields from "./CountryRegionFields";
import CurrencyAndPhoneFields from "./CurrencyAndPhoneFields";

const CompanyInfo = ({ editable, isPrivateSeller }) => {
  const [countries, setCountries] = useState([]);
  const { currency } = useContext(AuthContext);
  const { values, setFieldValue } = useFormikContext();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "currency") {
      const selectedCurrency = currency.find((c) => c.id === parseInt(value));
      if (selectedCurrency) {
        setFieldValue("user.currency", selectedCurrency?.id);
      } else {
        console.error("Selected currency not found");
      }
    } else {
      setFieldValue(`user.${name}`, value);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
  }, []);

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
        <CountryRegionFields
          setFieldValue={setFieldValue}
          editable={editable}
          values={values}
          countries={countries}
          onRegionChangeFunction={(e) => handleInputChange(e)}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <div className={`w-full ${editable ? "block" : "hidden"}`}>
          {" "}
          <PlaceApi isEditProfile={true} existingCityValue={values.user.city} />
        </div>
        <div className={`w-full ${editable ? "hidden" : "block"}`}>
          <FormField
            label="Town/City"
            FieldType="text"
            inputField={false}
            value={values.user.city}
            name="city"
            onChange={(e) => handleInputChange(e)}
            readOnly={!editable}
          />
        </div>
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
      <CurrencyAndPhoneFields
        values={values}
        countries={countries}
        currency={currency}
        onChange={(e) => handleInputChange(e)}
        editable={editable}
      />
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
