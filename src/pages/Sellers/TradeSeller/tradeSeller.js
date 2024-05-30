// TradeSeller.js
import React from "react";
import { Formik, Form } from "formik";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets";
import { validationSchema } from "../../../utils/ValidationSchema";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {
  stepOneFields,
  stepThreeFields,
  stepTwoFields,
  tradeSellerInitialValues,
} from "../../../utils/DummyData";
import {
  ProgressSteps,
  TradeSellerCompanyInfoForm,
  TradeSellerFacilitiesForm,
  TradeSellerServiceHoursForm,
} from "../../../components";
import { useErrorDisplay, useSignUp } from "../../../Hooks";

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
    signUp(values, "trade-seller/register", "trade");
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
            <Form>
              {" "}
              {step === 1 && <TradeSellerCompanyInfoForm sellerType="trade" />}
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
                    type="button"
                    onClick={() => onSubmit(values)}
                    disabled={!isValid}
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
