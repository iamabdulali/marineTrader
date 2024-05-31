import { Form } from "formik";
import React from "react";
import {
  TradeSellerCompanyInfoForm,
  TradeSellerServiceHoursForm,
  TradeSellerFacilitiesForm,
} from "../../index";
import { Oval } from "react-loader-spinner";

function MainForm({
  step,
  values,
  prevStep,
  nextStep,
  onSubmit,
  isValid,
  spinner,
}) {
  return (
    <>
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
              onClick={nextStep}
              className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 rounded-md w-28`}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
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
    </>
  );
}

export default MainForm;
