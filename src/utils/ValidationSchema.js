// utils/ValidationSchema.js
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  websiteAddress: Yup.string()
    .url("Enter a valid URL")
    .required("Website Address is required"),
  buildingNumber: Yup.string().required("Building Number is required"),
  streetName: Yup.string().required("Street Name is required"),
  townCity: Yup.string().required("Town/City is required"),
  postcode: Yup.string().required("Postcode is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.string()
    .length(9, "Phone Number must be of 9 characters")
    .required("Phone Number is required"),
  timezone: Yup.string().required("Timezone is required"),
  emailAddress: Yup.string()
    .email("Enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  areaCode: Yup.string().required("Area Code is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
});
