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
  advert_status,
}) => {
  // Function to handle input change and allow only numeric values
  const handleNumericInputChange = (e, setFieldValue) => {
    const value = e.target.value;
    // Remove non-numeric characters using regular expression
    const numericValue = value.replace(/\D/g, "");
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
              FieldType="text"
              name="offer"
              label="Offer"
              className="w-full border-2 px-3 py-3 rounded-md"
              onChange={(e) =>
                // handleInputChange(e, null, null, null, false, setFieldValue)
                handleNumericInputChange(e, setFieldValue)
              }
            />
            <button
              type="submit"
              disabled={advert_status == "paid" ? false : true}
              className={`w-full bg-[#0D1A8B] ${
                advert_status == "paid"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-80 pointer-events-none"
              } hover:bg-[#0a1dbd] my-5 text-white rounded-md p-3 font-medium`}
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
