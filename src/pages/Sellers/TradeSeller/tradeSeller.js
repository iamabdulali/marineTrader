// TradeSeller.js
import React from "react";
import { Formik } from "formik";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets";
import { validationSchema } from "../../../utils/ValidationSchema";
import { Link } from "react-router-dom";
import {
  stepOneFields,
  stepThreeFields,
  stepTwoFields,
  tradeSellerInitialValues,
} from "../../../utils/DummyData";
import { ProgressSteps } from "../../../components";
import { useErrorDisplay, useSignUp } from "../../../Hooks";
import MainForm from "../../../components/Forms/FormElements/MainForm";

const TradeSeller = () => {
  const { step, setStep, nextStep } = useErrorDisplay(
    stepOneFields,
    stepTwoFields,
    stepThreeFields
  );
  const stepLabels = [
    "Company Info",
    "Business Details",
    "Contact Person Details",
  ];

  const prevStep = () => setStep(step - 1);
  const { signUp, spinner } = useSignUp();

  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      service_hours: JSON.stringify(values.service_hours),
    };
    signUp("trade-seller/register", updatedValues);
  };

  return (
    <div className="flex">
      <div className="lg:w-7/12 p-4 w-full">
        <Link to="/register">
          <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        </Link>
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
          initialValues={tradeSellerInitialValues}
          validationSchema={validationSchema}
        >
          {({ isValid, values, setErrors, setTouched }) => (
            <MainForm
              values={values}
              isValid={isValid}
              prevStep={prevStep}
              spinner={spinner}
              step={step}
              onSubmit={() => onSubmit(values)}
              nextStep={() => nextStep(values, { setTouched, setErrors })}
            />
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
