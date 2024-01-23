import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProgressSteps from "../../components/ProgressSteps";
import SelectCategoryStep1 from "../../components/BuildAdSteps/SelectCategoryStep1";
import { Formik, Form } from "formik";
import ItemDescriptionStep2 from "../../components/BuildAdSteps/ItemDescriptionStep2";
import ItemFeaturesStep3 from "../../components/BuildAdSteps/ItemFeaturesStep3";
import NotesSteps4 from "../../components/BuildAdSteps/NotesSteps4";
import PriceStep6 from "../../components/BuildAdSteps/PriceStep6";
import GalleryStep5 from "../../components/BuildAdSteps/GalleryStep5";
import { buildAdValidationSchema } from "../../utils/ValidationSchema";

const BuildAd = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Jet Skis");
  const stepLabels = [
    "Category",
    "Description",
    "Features",
    "Notes",
    "Gallery",
    "Price",
  ];
  const prevStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  const handleCategoryChange = (category, setFieldValue) => {
    setSelectedCategory(category);
    setFieldValue("boatName", category);
  };
  const initialValues = {
    boatName: "",
    tags: [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
  };
  return (
    <Layout>
      <p className="rounded-lg shadow-[7px] bg-white font-semibold py-5 px-7">
        Build Your Ad
      </p>
      <ProgressSteps
        className="mt-7"
        totalSteps={stepLabels.length}
        currentStep={step}
        stepLabels={stepLabels}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={buildAdValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          isValid,
          values,
          setErrors,
          setTouched,
          setFieldValue,
        }) => (
          <Form>
            {" "}
            {step === 1 && (
              <SelectCategoryStep1
                onCategoryChange={(category) =>
                  handleCategoryChange(category, setFieldValue)
                }
              />
            )}
            {step === 2 && <ItemDescriptionStep2 />}
            {step === 3 && <ItemFeaturesStep3 />}
            {step === 4 && <NotesSteps4 />}
            {step === 5 && <GalleryStep5 />}
            {step === 6 && <PriceStep6 />}
            {/* Navigation buttons */}
            <div className="flex align-center justify-between mt-10">
              <div>
                <button
                  type="button"
                  className="bg-white border-2 border-[#8891B2] text-[#8891B2] p-3 rounded-md w-28 text-sm font-medium mr-5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-white border-2 border-[#0D1A8B] text-[#0D1A8B] font-medium p-3 rounded-md text-sm"
                >
                  Save To Draft
                </button>
              </div>
              <div className="text-right mr-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#8891B2] text-white p-3 rounded-md w-28 mr-5"
                  >
                    Back
                  </button>
                )}

                {step < 6 ? (
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
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default BuildAd;
