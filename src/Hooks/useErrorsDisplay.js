import { useState } from "react";
import { validationSchema } from "../utils/ValidationSchema";

const useErrorDisplay = (
  stepOneFields = [],
  stepTwoFields = [],
  stepThreeFields = []
) => {
  const [step, setStep] = useState(1);

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      // Validate only the fields for the current step
      const fieldsToValidate = Object.keys(validationSchema.fields).filter(
        (field) => {
          // Customize this condition based on your step logic
          if (step === 1) {
            return stepOneFields.includes(field);
          } else if (step === 2) {
            return stepTwoFields.includes(field);
          } else if (step === 3) {
            return stepThreeFields.includes(field);
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
  return { step, setStep, nextStep };
};

export default useErrorDisplay;
