import React from "react";
import { FormField } from "../../components/FormField";

const CompanyInfo = () => {
  return (
    <>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Username"
          FieldType="text"
          inputField={false}
          value="John Smith"
          name="username"
        />
        <FormField
          label="Company Name"
          FieldType="text"
          inputField={false}
          value="john23"
          name="companyName"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Building Number"
          FieldType="text"
          inputField={false}
          value="23"
          name="buildingNumber"
        />
        <FormField
          label="Street Name"
          FieldType="text"
          inputField={false}
          value="NY Street"
          name="streetName"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Town/City"
          FieldType="text"
          inputField={false}
          value="New York"
          name="city"
        />
        <FormField
          label="Postal Code"
          FieldType="text"
          inputField={false}
          value="232323"
          name="postalCode"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Country"
          FieldType="text"
          inputField={false}
          value="USA"
          name="country"
        />
        <FormField
          label="Region"
          FieldType="text"
          inputField={false}
          value="NY"
          name="region"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Phone Number"
          FieldType="tel"
          inputField={false}
          value="+1 2252 5588"
          name="phoneNumber"
        />
        <FormField
          label="Currency"
          FieldType="text"
          inputField={false}
          value="USD"
          name="currency"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Email"
          FieldType="email"
          inputField={false}
          value="johnsmith@gmail.com"
          name="email"
        />
        <FormField
          label="Password"
          FieldType="password"
          inputField={false}
          value="password"
          name="password"
        />
      </div>
    </>
  );
};

export default CompanyInfo;
