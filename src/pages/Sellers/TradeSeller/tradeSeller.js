// TradeSeller.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import TradeSellerCompanyInfoForm from "../../../components/Forms/TradeSellerCompanyInfoForm";
import TradeSellerServiceHoursForm from "../../../components/Forms/TradeSellerServiceHoursForm";
import TradeSellerFacilitiesForm from "../../../components/Forms/TradeSellerFacilitiesForm";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets";
import { validationSchema } from "../../../utils/ValidationSchema";

const initialValues = {
  companyName: "",
  websiteAddress: "",
  aboutCompany: "",
  buildingNumber: "",
  streetName: "",
  townCity: "",
  postcode: "",
  country: "",
  phoneNumber: "",
  timezone: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
  areaCode: "",
  contactNumber: "",
  startTime: "",
  endTime: "",
  facilities: "",
};

const TradeSeller = () => {
  const [step, setStep] = useState(1);

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      // Validate only the fields for the current step
      const fieldsToValidate = Object.keys(validationSchema.fields).filter(
        (field) => {
          // Customize this condition based on your step logic
          if (step === 1) {
            return [
              "companyName",
              "websiteAddress",
              "aboutCompany",
              "buildingNumber",
              "streetName",
              "townCity",
              "postcode",
              "country",
              "phoneNumber",
              "timezone",
              "emailAddress",
              "password",
              "confirmPassword",
            ].includes(field);
          } else if (step === 2) {
            return ["areaCode", "contactNumber"].includes(field);
          } else if (step === 3) {
            return [
              "serviceType",
              "contactNumber",
              "areaCode",
              "selectedDays",
              "dayTimes",
              "publicHolidays",
            ].includes(field);
          }
          return true; // Include all fields if not in a specific step
        }
      );

      validationSchema
        .pick(fieldsToValidate)
        .validateSync(values, { abortEarly: false });

      // Increment the step
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Display validation errors even if the user is trying to move to the next step
        console.error("Validation errors:", error.errors);

        // Set touched for all fields to trigger error messages
        const allFields = Object.keys(values);
        const touchedState = allFields.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
        setTouched(touchedState);

        // Set errors to display them in the form
        const errorState = error.errors.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorState);
      } else {
        // Handle other errors
        console.error("Error:", error.message);
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (values, { setSubmitting }) => {
    // Assuming you want to display the form data as JSON
    const formDataString = JSON.stringify(values);
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="flex">
      {/* Left side (Form) */}
      <div className="lg:w-7/12 p-4 w-full">
        {/* Title */}
        <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        <h1 className="capitalize font-bold text-[#11133D] sm:ml-8 mt-10 ml-3">
          Sign up as a trade seller
        </h1>

        {/* Progress Indicator */}
        <div className="flex justify-center  text-center mt-10 sm:w-8/12 w-11/12 mx-auto">
          {[1, 2, 3].map((progress, index) => (
            <React.Fragment key={progress}>
              {index > 0 && (
                <div
                  className={` h-1 w-full rounded-sm relative top-5 bar${progress} ${
                    progress <= step
                      ? "bg-[#0D1A8B]"
                      : "bg-[#8891B2] bg-opacity-20"
                  }`}
                />
              )}
              <div className="flex flex-col items-center gap-4  font-semibold ">
                <div
                  className={` ${
                    progress <= step
                      ? "text-[#0D1A8B] border-[#0D1A8B]"
                      : "text-[#8891B2] border-[#8891B2]"
                  } font-semibold w-12 h-12 flex justify-center items-center rounded-full border-2 `}
                >
                  {progress}
                </div>
                <div
                  className={`${
                    progress <= step ? "text-[#0D1A8B]" : "text-[#8891B2]"
                  }`}
                >
                  {progress === 1 && "Service Hours"}
                  {progress === 2 && "Company Info"}
                  {progress === 3 && "Facilities"}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Form Content */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, values, setErrors, setTouched }) => (
            <Form>
              {" "}
              {step === 1 && <TradeSellerCompanyInfoForm />}
              {step === 2 && <TradeSellerServiceHoursForm />}
              {step === 3 && <TradeSellerFacilitiesForm />}
              <div className="text-right mr-8 mt-10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#8891B2] text-white p-3 rounded-md w-28 mr-5"
                  >
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // Add this line
                      nextStep(values, { setTouched, setErrors });
                    }}
                    className={`bg-[#0D1A8B] text-white p-3 rounded-md w-28`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`bg-[#0D1A8B] text-white p-3 rounded-md w-28  ${
                      isValid ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Right side (Image) */}
      <div className="w-5/12 xl:static fixed right-0 lg:block hidden">
        {/* Replace the image URL with your desired image */}
        <img className="xl:h-auto min-h-screen" src={Ship} alt="Ship" />
      </div>
    </div>
  );
};

export default TradeSeller;
