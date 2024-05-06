import React from "react";
import { FormField } from "../FormField";
import { Formik, Form } from "formik";
import { Oval } from "react-loader-spinner";
import { handleInputChange } from "../../utils/handleInputChange";

const MakeOfferForm = ({
  initialValues,
  handleFormSubmit,
  validationSchema,
  spinner,
  advertStatus,
}) => {
  console.log(advertStatus);

  const handleNumericInputChange = (e, setFieldValue) => {
    const value = e.target.value;
    // Remove non-numeric and non-decimal characters using regular expression
    const numericValue = value.replace(/[^0-9.]/g, "");
    // Set the field value to the cleaned numeric value
    setFieldValue(e.target.name, numericValue);
  };

  return (
    <>
      {" "}
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, values, setErrors, setTouched, setFieldValue }) => (
          <Form>
            <FormField
              inputField={true}
              FieldType="text"
              name="name"
              label="Name"
              className="w-full border-2 px-3 py-3 rounded-md"
              onChange={(e) =>
                handleInputChange(e, null, null, null, false, setFieldValue)
              }
            />
            <FormField
              inputField={true}
              FieldType="email"
              name="email"
              label="Email"
              className="w-full border-2 px-3 py-3 rounded-md"
              onChange={(e) =>
                handleInputChange(e, null, null, null, false, setFieldValue)
              }
            />
            <FormField
              inputField={true}
              FieldType="tel"
              name="phone"
              label="Phone"
              className="w-full border-2 px-3 py-3 rounded-md"
              onChange={(e) =>
                handleInputChange(e, null, null, null, false, setFieldValue)
              }
            />
            <FormField
              inputField={true}
              // FieldType="number"
              name="offer"
              label="Offer"
              onKeyPress={(e) => {
                // Prevent input for non-numeric and non-decimal characters
                const charCode = e.which ? e.which : e.keyCode;
                if (
                  (charCode < 48 || charCode > 57) && // not a number
                  charCode !== 46 && // not a decimal point
                  charCode !== 8 && // not a backspace
                  charCode !== 9 // not a tab
                ) {
                  e.preventDefault();
                }
              }}
              className="w-full border-2 px-3 py-3 rounded-md"
              onChange={(e) =>
                // handleInputChange(e, null, null, null, false, setFieldValue)
                handleNumericInputChange(e, setFieldValue)
              }
            />
            <button
              type="submit"
              className={`w-full bg-[#0D1A8B] hover:bg-[#0a1dbd] my-5 text-white rounded-md p-3 font-medium ${
                advertStatus == "paid" ? "" : "pointer-events-none opacity-80"
              }`}
            >
              {spinner ? (
                <Oval
                  secondaryColor="#fff"
                  color="#fff"
                  width={20}
                  height={20}
                  wrapperClass="justify-center"
                />
              ) : (
                "Make Offer"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MakeOfferForm;
