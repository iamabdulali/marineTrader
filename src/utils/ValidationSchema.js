// utils/ValidationSchema.js
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
  companyInfo: Yup.string().required("Company Info is required"),
  buildingNumber: Yup.string().required("Building Number is required"),
  streetName: Yup.string().required("Street Name is required"),
  city: Yup.string().required("Town/City is required"),
  postcode: Yup.string().required("Postcode is required"),
  country: Yup.string().required("Country is required"),
  region: Yup.string().required("Region is required"),
  phoneNo: Yup.string()
    .length(11, "Phone Number must be of 11 characters")
    .required("Phone Number is required"),
  currency: Yup.string().required("Currency is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email Address is required"),
  confirmEmail: Yup.string()
    .email("Enter a valid email address")
    .required("Confirm Email Address is required")
    .oneOf([Yup.ref("email"), null], "Emails must match"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  timeZone: Yup.string().required("Timezone is required"),
  openPublicHolidays: Yup.string().required("Public Holiday Required"),
  companyLogo: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large (max 1 MB)",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    )
    .test(
      "isRequired",
      "Please upload a picture",
      (value) => value !== undefined && value !== null
    ),
  mainPicture: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large (max 1 MB)",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    )
    .test(
      "isRequired",
      "Please upload a picture",
      (value) => value !== undefined && value !== null
    ),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  jobTitle: Yup.string().required("Job Title is required"),
});

export const categoryDropdownValidationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  type: Yup.string().required("Type is required"),
  condition: Yup.string().required("Condition is required"),
  year: Yup.string().required("Year is required"),
});

export const buildAdValidationSchema = Yup.object().shape({
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  condition: Yup.string().required("Condition is required"),
  year: Yup.string().required("Year is required"),
  color: Yup.string().required("Color is required"),
  serviceHistory: Yup.string().required("Service History is required"),
  passenger: Yup.string().required("Passenger is required"),
  length: Yup.string().required("Length is required"),
  hours: Yup.string().required("Hours is required"),
  trailers: Yup.string().required("Trailers is required"),
  modification: Yup.string().required("Modification is required"),
  feature: Yup.string().required("Feature is required"),
  convenience: Yup.string().required("Convenience is required"),
  accessories: Yup.string().required("Accessories is required"),
});
