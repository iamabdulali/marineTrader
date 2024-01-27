import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProgressSteps from "../../components/ProgressSteps";
import SelectCategoryStep1 from "../../components/BuildAdSteps/SelectCategoryStep1";
import { Formik, Form } from "formik";
import ItemDescriptionStep2 from "../../components/BuildAdSteps/ItemDescriptionStep2";
import ItemFeaturesStep3 from "../../components/BuildAdSteps/ItemFeaturesStep3";
import NotesSteps4 from "../../components/BuildAdSteps/NotesSteps4";
import PriceStep6 from "../../components/BuildAdSteps/PriceStep6";
import GalleryStep5 from "../../components/BuildAdSteps/GalleryStep5";
import {
  buildAdValidationSchema,
  imageValidationSchema,
} from "../../utils/ValidationSchema";
import { AuthContext } from "../../Context/AuthContext";

const BuildAd = () => {
  const [step, setStep] = useState(6);

  const [selectedCategory, setSelectedCategory] = useState("Jet Skis");
  const stepLabels = [
    "Category",
    "Description",
    "Features",
    "Notes",
    "Gallery",
    "Price",
  ];

  const handleCategoryChange = (category, setFieldValue) => {
    setSelectedCategory(category);
    setFieldValue("boatName", category);
  };
  const initialValues = {
    boatName: "",
    title: "",
    subtitle: "",
    make: "",
    modal: "",
    year: "",
    condition: "",
    color: "",
    serviceHistory: "",
    passenger: "",
    length: "",
    hours: "",
    trailers: "",
    modification: [],
    feature: "",
    convenience: "",
    accessories: "",
    description: "",
    tags: [],
    buildAdImages: [],
    buildAdVideo: [],
    priceOnInformation: "",
    currency: "",
    price: "",
    facilities: [],
    packageName: "",
    countries: [],
  };
  const prevStep = () => setStep(step - 1);

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      // Validate only the fields for steps 2 to 6
      if (step > 1) {
        const fieldsToValidate = Object.keys(
          buildAdValidationSchema.fields
        ).filter((field) => {
          if (step === 2) {
            return [
              "title",
              "subtitle",
              "make",
              "model",
              "year",
              "condition",
              "color",
              "serviceHistory",
              "passenger",
              "length",
              "hours",
              "trailers",
            ].includes(field);
          } else if (step === 3) {
            return [
              "modification",
              "feature",
              "convenience",
              "accessories",
            ].includes(field);
          } else if (step === 4) {
            return ["description", "tags"].includes(field);
          } else if (step === 5) {
            return ["buildAdImages", "buildAdVideo"].includes(field);
          } else if (step === 6) {
            return ["currency", "price"].includes(field);
          }
          return true; // Include all fields if not in a specific step
        });

        buildAdValidationSchema.pick(fieldsToValidate).validateSync(values, {
          abortEarly: false,
        });
      }

      // Increment the step
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation errors:", error.errors);

        const allFields = Object.keys(values);
        const touchedState = allFields.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
        setTouched(touchedState);

        const errorState = error.errors.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorState);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // alert(JSON.stringify(values));
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
        // validationSchema={buildAdValidationSchema}
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
            {step === 6 && (
              <PriceStep6 values={values} setFieldValue={setFieldValue} />
            )}
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
                    List Item
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
