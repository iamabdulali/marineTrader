import React, { useContext, useState } from "react";
import { FormField } from "../../components/FormField";
import { AuthContext } from "../../Context/AuthContext";

const CompanyInfo = ({ editable, user }) => {
  const [userData, setUserData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Username"
          FieldType="text"
          inputField={false}
          value={userData.user_name}
          name="user_name"
          onChange={(e) => handleInputChange(e)}
          readOnly={true}
        />
        <FormField
          label="Company Name"
          FieldType="text"
          inputField={false}
          value="john23"
          name="companyName"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Building Number"
          FieldType="text"
          inputField={false}
          value={userData.building_number}
          name="building_number"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
        <FormField
          label="Street Name"
          FieldType="text"
          inputField={false}
          value={userData.street_name}
          name="street_name"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Town/City"
          FieldType="text"
          inputField={false}
          value={userData.city}
          name="city"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
        <FormField
          label="Postal Code"
          FieldType="text"
          inputField={false}
          value={userData.postcode}
          name="postcode"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Country"
          FieldType="text"
          inputField={false}
          value={userData.country}
          name="country"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
        <FormField
          label="Region"
          FieldType="text"
          inputField={false}
          value={userData.region}
          name="region"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Phone Number"
          FieldType="tel"
          inputField={false}
          value={userData.phone_no}
          name="phone_no"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
        />
        <FormField
          label="Currency"
          FieldType="text"
          inputField={false}
          value="USD"
          onChange={(e) => handleInputChange(e)}
          readOnly={editable}
          name="currency"
        />
      </div>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="Email"
          FieldType="email"
          inputField={false}
          value={userData.email}
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
          readOnly={editable}
        />
      </div>
    </form>
  );
};

export default CompanyInfo;
