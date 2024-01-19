// TradeSeller.js
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import TradeSellerCompanyInfoForm from "../../../components/Forms/TradeSellerCompanyInfoForm";
import TradeSellerServiceHoursForm from "../../../components/Forms/TradeSellerServiceHoursForm";
import TradeSellerFacilitiesForm from "../../../components/Forms/TradeSellerFacilitiesForm";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets";
import { validationSchema } from "../../../utils/ValidationSchema";
import { Navigate, useNavigate } from "react-router-dom";
import { useSignup } from "../../../Hooks/useSignUpTrade";
import { AuthContext } from "../../../Context/AuthContext";

const initialValues = {
  username: "",
  companyInfo: "",
  buildingNumber: "",
  streetName: "",
  city: "",
  postcode: "",
  country: "",
  region: "",
  phoneNo: "",
  currency: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  timeZone: "",
  // daysAvailable: "",
  openPublicHolidays: "",
  companyLogo: "",
  mainPicture: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
};

const TradeSeller = () => {
  const [step, setStep] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const { signup, error } = useSignup();

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      // Validate only the fields for the current step
      const fieldsToValidate = Object.keys(validationSchema.fields).filter(
        (field) => {
          // Customize this condition based on your step logic
          if (step === 1) {
            return [
              "username",
              "companyInfo",
              "buildingNumber",
              "streetName",
              "city",
              "postcode",
              "country",
              "region",
              "phoneNo",
              "currency",
              "email",
              "confirmEmail",
              "password",
              "confirmPassword",
            ].includes(field);
          } else if (step === 2) {
            return [
              "timeZone",
              // "daysAvailable",
              "openPublicHolidays",
              "companyLogo",
              "mainPicture",
            ].includes(field);
          } else if (step === 3) {
            return ["firstName", "lastName", "jobTitle"].includes(field);
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

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    try {
      // Use the login function from the custom hook
      await signup(
        values.username,
        values.companyInfo,
        values.buildingNumber,
        values.streetName,
        values.city,
        values.postcode,
        values.country,
        values.region,
        values.phoneNo,
        values.currency,
        values.email,
        values.confirmEmail,
        values.password,
        values.confirmPassword,
        values.timeZone,
        // values.daysAvailable,
        values.openPublicHolidays,
        values.companyLogo,
        values.mainPicture,
        values.firstName,
        values.lastName,
        values.jobTitle
      );
      setRedirect(true);

      // If login is successful, navigate to the dashboard
    } catch (error) {
      setRedirect(false);
      console.error("Registration Error:", error);
    }
  };

  console.log(user);

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="flex">
      {/* Left side (Form) */}
      <div className="lg:w-7/12 p-4 w-full">
        {/* Title */}
        <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        <h1 className="capitalize font-bold text-[#11133D] sm:ml-8 mt-10 ml-3">
          Sign up as Trade
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
              <div className="flex flex-col items-center gap-4 font-semibold ">
                <div
                  className={` ${
                    progress <= step
                      ? "text-[#0D1A8B] border-[#0D1A8B]"
                      : "text-[#8891B2] border-[#8891B2]"
                  } font-semibold w-12 h-12 flex justify-center items-center rounded-full border-2 `}
                >
                  {progress}
                </div>
                <p
                  className={`${
                    progress <= step ? "text-[#0D1A8B]" : "text-[#8891B2]"
                  } text-xs w-28 `}
                >
                  {progress === 1 && "Company Info"}
                  {progress === 2 && "Business Details"}
                  {progress === 3 && "Contact Person Details"}
                </p>
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
              {/* Navigation buttons */}
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
                    onClick={() => nextStep(values, { setTouched, setErrors })}
                    className={`bg-[#0D1A8B] text-white p-3 rounded-md w-28`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid}
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
