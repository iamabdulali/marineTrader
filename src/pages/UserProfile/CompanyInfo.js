import React, { useContext } from "react";
import { FormField } from "../../components/FormField";
import { Field, useFormikContext } from "formik";
import SelectDropdown from "../../components/SelectDropdown";
import { AuthContext } from "../../Context/AuthContext";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { countryOptions, regionOptions } from "../../utils/DropdownOptions";

const CompanyInfo = ({ editable, isPrivateSeller }) => {
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
  };

  console.log(values);

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
            value="john23"
            name="companyName"
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
        <FormField
          label="Town/City"
          FieldType="text"
          inputField={false}
          value={values.user.city}
          name="city"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
        />
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
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <div className="w-full mb-4">
          <label
            className="block text-[#8891B2] text-sm font-medium"
            htmlFor={"country"}
          >
            Country
          </label>
          <Field
            onChange={(e) => handleInputChange(e)}
            value={values.user.country}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"country"}
          >
            <option>Select a {"country"}</option>
            {countryOptions.map((option) => (
              <option key={option.id} value={option.id} label={option.name}>
                {option.name}
              </option>
            ))}
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
            onChange={(e) => handleInputChange(e)}
            value={values.user.region}
            disabled={!editable}
            as="select"
            className={`border-b-2 text-sm font-semibold outline-none ${
              !editable ? "border-[#f1f1f1]" : "border-[#000]"
            }  py-2 px-0 text-[#11133D] w-full`}
            name={"region"}
          >
            <option>Select a {"Region"}</option>
            {regionOptions.map((option) => (
              <option key={option.id} value={option.id} label={option.name}>
                {option.name}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Phone Number"
          FieldType="tel"
          inputField={false}
          value={values.user.phone_no}
          name="phone_no"
          onChange={(e) => handleInputChange(e)}
          readOnly={!editable}
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
