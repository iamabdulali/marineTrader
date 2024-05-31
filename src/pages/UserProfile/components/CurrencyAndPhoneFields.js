import { Field } from "formik";
import React from "react";
import { FormField } from "../../../components/FormField";

function CurrencyAndPhoneFields({
  countries,
  values,
  currency,
  onChange,
  editable,
}) {
  function getPhoneCodeByCountryName(countryName) {
    const country = countries.find((country) => country.id == countryName);
    return country ? country?.phone_code : null;
  }

  return (
    <div className="flex sm:gap-6 items-center sm:flex-row flex-col relative">
      <div className="absolute left-0 sm:top-auto top-[14%] flex items-center ">
        <Field
          value={getPhoneCodeByCountryName(values?.user.country)}
          as="select"
          name="calling_code"
          disabled={true}
          className="rounded-md py-2 appearance-none callingCode w-full  text-sm bg-white"
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
        onChange={onChange}
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
          onChange={onChange}
          value={values.user?.currency?.id}
          disabled={!editable}
          as="select"
          className={`border-b-2 text-sm font-semibold outline-none sm:appearance-auto appearance-none ${
            !editable ? "border-[#f1f1f1]" : "border-[#000]"
          }  py-2 px-0 text-[#11133D] w-full`}
          name={"currency"}
        >
          <option>Select a {"currency"}</option>
          {currency.map((option) => (
            <option
              key={option.id}
              value={option.id}
              label={option.currency_code}
            >
              {option.currency_code}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
}

export default CurrencyAndPhoneFields;
