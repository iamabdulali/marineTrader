import React from "react";
import { FormField } from "../../../components/FormField";
import { useFormikContext } from "formik";

const ContactPersonDetails = ({ editable, user }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(`user.${name}`, value);
  };
  return (
    <>
      <div className="flex sm:gap-6 items-center sm:flex-row flex-col">
        <FormField
          label="First Name"
          FieldType="text"
          inputField={false}
          value={values.user.first_name}
          name="first_name"
          readOnly={!editable}
          onChange={(e) => handleInputChange(e)}
        />
        <FormField
          label="Last Name"
          FieldType="text"
          inputField={false}
          value={values.user.last_name}
          name="last_name"
          readOnly={!editable}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <FormField
        label="Job Title"
        FieldType="text"
        inputField={false}
        value={values.user.job_title}
        name="job_title"
        readOnly={!editable}
        onChange={(e) => handleInputChange(e)}
      />
    </>
  );
};

export default ContactPersonDetails;
