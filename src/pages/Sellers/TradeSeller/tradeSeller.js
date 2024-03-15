// TradeSeller.js
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import TradeSellerCompanyInfoForm from "../../../components/Forms/TradeSellerCompanyInfoForm";
import TradeSellerServiceHoursForm from "../../../components/Forms/TradeSellerServiceHoursForm";
import TradeSellerFacilitiesForm from "../../../components/Forms/TradeSellerFacilitiesForm";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets";
import { validationSchema } from "../../../utils/ValidationSchema";
import ProgressSteps from "../../../components/ProgressSteps";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../../utils/displayErrors";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { SERVER_BASE_URL } from "../../..";
import { AuthContext } from "../../../Context/AuthContext";

const initialValues = {
  name: "dummy10",
  user_name: "",
  company_name: "",
  building_number: "",
  street_name: "",
  city: "",
  postcode: "",
  country: "",
  region: "",
  phone_no: "",
  currency: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  countryCode: "",
  timezone: "",
  open_public_holidays: "",
  company_logo: null,
  main_picture: null,
  first_name: "",
  last_name: "",
  job_title: "",
  working_days: [],
  facilities: [],
  service_hours: [
    { day: "Mon", start_time: "", end_time: "" },
    { day: "Tues", start_time: "", end_time: "" },
    { day: "Wed", start_time: "", end_time: "" },
    { day: "Thurs", start_time: "", end_time: "" },
    { day: "Fri", start_time: "", end_time: "" },
    { day: "Sat", start_time: "", end_time: "" },
    { day: "Sun", start_time: "", end_time: "" },
  ],
};

const TradeSeller = () => {
  const { dispatch } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const [submit, setSubmit] = useState(false);
  const NavigateTo = useNavigate();
  const [step, setStep] = useState(1);
  const stepLabels = [
    "Company Info",
    "Business Details",
    "Contact Person Details",
  ];

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      // Validate only the fields for the current step
      const fieldsToValidate = Object.keys(validationSchema.fields).filter(
        (field) => {
          // Customize this condition based on your step logic
          if (step === 1) {
            return [
              "user_name",
              "company_name",
              "building_number",
              "street_name",
              "city",
              "postcode",
              "country",
              "region",
              "phone_no",
              "currency",
              "email",
              "confirmEmail",
              "password",
              "confirmPassword",
            ].includes(field);
          } else if (step === 2) {
            return [
              "timezone",
              "working_days",
              "open_public_holidays",
              "company_logo",
              "main_picture",
            ].includes(field);
          } else if (step === 3) {
            return ["first_name", "last_name", "job_title"].includes(field);
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

  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      service_hours: JSON.stringify(values.service_hours),
    };
    console.log(updatedValues);
    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/trade-seller/register`,
        updatedValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.data });
      setSpinner(false);
      NavigateTo("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return (
    <div className="flex">
      <div className="lg:w-7/12 p-4 w-full">
        <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        <h1 className="capitalize font-bold text-[#11133D] md:ml-8 mt-10 ml-3">
          Sign up as Trade
        </h1>
        <ProgressSteps
          className="mt-10 md:w-8/12 w-full mx-auto md:my-6 my-6"
          totalSteps={stepLabels.length}
          currentStep={step}
          stepLabels={stepLabels}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, values, setErrors, setTouched }) => (
            <Form>
              {" "}
              {step === 1 && <TradeSellerCompanyInfoForm />}
              {step === 2 && <TradeSellerServiceHoursForm values={values} />}
              {step === 3 && <TradeSellerFacilitiesForm />}
              <div className="text-right sm:mr-8 mt-10 flex items-center gap-5 justify-end">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#8891B2] text-white p-3 rounded-md w-28 "
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => nextStep(values, { setTouched, setErrors })}
                    className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 rounded-md w-28`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type={submit ? "submit" : "button"}
                    onClick={() => setSubmit(true)}
                    disabled={spinner}
                    className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 min-h-12 rounded-md w-28  ${
                      isValid ? "opacity-100" : "opacity-70"
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
                      " Submit"
                    )}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-5/12 xl:static fixed right-0 lg:block hidden">
        <img className="xl:h-auto min-h-screen" src={Ship} alt="Ship" />
      </div>
    </div>
  );
};

export default TradeSeller;
