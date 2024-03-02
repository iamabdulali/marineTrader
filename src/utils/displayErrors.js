import { toast } from "react-toastify";

// Function to display error messages from errors object
export const displayErrorMessages = (errors) => {
  if (errors && typeof errors === "object") {
    Object.keys(errors).forEach((field) => {
      errors[field].forEach((errorMessage) => {
        toast.error(`${errorMessage}`);
      });
    });
  } else {
    toast.error("An unexpected error occurred");
  }
};
