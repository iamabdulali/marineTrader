// utils/ValidationSchema.js
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("User Name is required"),
  company_name: Yup.string().required("Company Info is required"),
  building_number: Yup.string().required("Building Number is required"),
  street_name: Yup.string().required("Street Name is required"),
  city: Yup.string().required("Town/City is required"),
  postcode: Yup.string().required("Postcode is required"),
  country: Yup.string().required("Country is required"),
  region: Yup.string().required("Region is required"),
  phone_no: Yup.string()
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
  timezone: Yup.string().required("Timezone is required"),
  open_public_holidays: Yup.string().required("Public Holiday Required"),
  company_logo: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large (max 1 MB)",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "isRequired",
      "Please upload a picture",
      (value) => value !== undefined && value !== null
    )
    .required("Please Upload a Picture"),
  main_picture: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large (max 1 MB)",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "isRequired",
      "Please upload a picture",
      (value) => value !== undefined && value !== null
    )
    .required("Please Upload a Picture"),
  selectedDays: Yup.array().min(1, "Select at least one day"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  job_title: Yup.string().required("Job Title is required"),
});

export const categoryDropdownValidationSchema = Yup.object().shape({
  // category: Yup.string().required("Category is required"),
  // make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  type: Yup.string().required("Type is required"),
  condition: Yup.string().required("Condition is required"),
  year: Yup.string().required("Year is required"),
});

// Validation schema for images (buildAdImages)
const imageValidationSchema = Yup.array()
  // .test("fileSize", "File size is too large", (value) => {
  //   // Assuming you want to limit the file size to 5MB for images
  //   return !value.some((file) => file.size > 5 * 1024 * 1024);
  // })
  // .test("fileType", "Invalid file type", (value) => {
  //   // Validate file type for images
  //   const acceptedImageTypes = ["image/jpeg", "image/png"];
  //   return !value.some((file) => !acceptedImageTypes.includes(file.type));
  // })
  // .test("fileCount", "Maximum 5 images allowed", (value) => {
  //   // Validate the number of selected files (images)
  //   return !value || value.length <= 5;
  // })
  .min("Please upload at least one image");

// Validation schema for videos (buildAdVideo)
const videoValidationSchema = Yup.array()
  .test("fileSize", "File size is too large", (value) => {
    // Assuming you want to limit the file size to 1000MB for videos
    return !value.some((file) => file.size > 1000 * 1024 * 1024);
  })
  .test("fileType", "Invalid file type", (value) => {
    // Validate file type for videos
    const acceptedVideoTypes = ["video/*"];
    return !value.some((file) => !acceptedVideoTypes.includes(file.type));
  })
  .min("Please upload a video");

export const buildAdValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  sub_title: Yup.string().required("Subtitle is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  condition: Yup.string().required("Condition is required"),
  year: Yup.string().required("Year is required"),
  color: Yup.string().required("Color is required"),
  service_history: Yup.string().required("Service History is required"),
  passenger: Yup.string().required("Passenger is required"),
  length: Yup.string().required("Length is required"),
  hours: Yup.string().required("Hours is required"),
  trailers: Yup.string().required("Trailers is required"),
  modification: Yup.array().min(1, "Select at least one option"),
  features: Yup.array().min(1, "Select at least one option"),
  convenience: Yup.array().min(1, "Select at least one option"),
  accessories: Yup.array().min(1, "Select at least one option"),
  description: Yup.string().required("Description is required"),
  // buildAdImages: Yup.array().min("Select At One Photo"),
  // buildAdVideo: videoValidationSchema,
  images: Yup.array().min(1, "Please upload at least one image"),
  // video: Yup.mixed().required("Video is Required"),
  currency: Yup.string().required("Currency is required"),
  price: Yup.string().required("Price is required"),
});

export const privateSellerValidationSchema = Yup.object({
  name: Yup.string().required("Please enter your Full Name"),
  user_name: Yup.string().required("Please enter your User Name"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email Address is required"),
  building_number: Yup.string().required("Please enter your Building Number"),
  street_name: Yup.string().required("Please enter your Street Name"),
  city: Yup.string().required("Please enter your Town/city"),
  postcode: Yup.string().required("Please enter your Postcode"),
  country: Yup.string().required("Please select your Country"),
  currency: Yup.string().required("Please select your Currency"),
  region: Yup.string().required("Please select your Region"),
  phone_no: Yup.string()
    .length(11, "Phone Number must be of 11 characters")
    .required("Phone Number is required"),
  timezone: Yup.string().required("Please enter your Timezone"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmEmail: Yup.string()
    .email("Enter a valid email address")
    .required("Confirm Email Address is required")
    .oneOf([Yup.ref("email"), null], "Emails must match"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string().required("Password is required"),
});

export const makeOfferValidationSchema = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email Address is required"),
  offer: Yup.number().required("Please Enter Some Amount"),
  phone: Yup.string()
    .length(11, "Phone Number must be of 11 characters")
    .required("Phone Number is required"),
});
