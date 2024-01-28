import React from "react";
import { FormField } from "../../components/FormField";

const ContactPersonDetails = () => {
  return (
    <>
      <div className="flex gap-6 items-center">
        <FormField
          label="First Name"
          FieldType="text"
          inputField={false}
          value="John"
          name="firstName"
        />
        <FormField
          label="Last Name"
          FieldType="text"
          inputField={false}
          value="Smith"
          name="lastName"
        />
      </div>
      <FormField
        label="Job Title"
        FieldType="text"
        inputField={false}
        value="Sales Man"
        name="jobTitle"
      />
    </>
  );
};

export default ContactPersonDetails;
