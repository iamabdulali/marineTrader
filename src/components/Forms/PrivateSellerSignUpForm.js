import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { cloud, eye, plusSign } from "../../assets";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignup } from "../../Hooks/useSignUp";

export default function PrivateSellerSignUpFormForm() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { signup } = useSignup();
  const user = localStorage.getItem("user");

  const initialValues = {
    name: "",
    email: "",
    buildingNumber: "",
    streetName: "",
    city: "",
    postcode: "",
    country: "",
    phoneNo: "",
    timeZone: "",
    password: "",
    sellerType: "private seller",
    imageField: "asdasdsad",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your full name"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email Address is required"),
    buildingNumber: Yup.string().required("Please enter your building number"),
    streetName: Yup.string().required("Please enter your street name"),
    city: Yup.string().required("Please enter your town/city"),
    postcode: Yup.string().required("Please enter your postcode"),
    country: Yup.string().required("Please select your country"),
    phoneNo: Yup.string()
      .length(11, "Phone Number must be of 11 characters")
      .required("Phone Number is required"),
    timeZone: Yup.string().required("Please enter your timezone"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const onSubmit = async (values) => {
    console.log(values);

    try {
      // Make API request using signup function
      await signup(
        values.name,
        values.email,
        values.buildingNumber,
        values.streetName,
        values.city,
        values.postcode,
        values.country,
        values.phoneNo,
        values.timeZone,
        values.password,
        values.sellerType,
        values.imageField
      );
      setRefresh(!refresh);
      // navigate("/dashboard");
    } catch (error) {
      setRefresh(!refresh);
      console.error("API Request Error:", error);
    }
  };

  const togglePasswordVisibility = (field, setFieldValue, values) => {
    setFieldValue(`showPassword${field}`, !values[`showPassword${field}`]);
  };

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="sm:mx-8 mx-3 my-5">
      {/* Left side (Form) */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-[#8891B2] text-sm"
          >
            {/* Form rows */}
            <div className="flex gap-4 sm:flex-row flex-col">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.name && touched.name && "border-red-500"
                }`}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
              <Field
                type="text"
                name="email"
                placeholder="email"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.usernameEmail &&
                  touched.usernameEmail &&
                  "border-red-500"
                }`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
              <Field
                type="text"
                name="buildingNumber"
                placeholder="Building Number"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.buildingNumber &&
                  touched.buildingNumber &&
                  "border-red-500"
                }`}
              />
              <ErrorMessage
                name="buildingNumber"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
              <Field
                type="text"
                name="streetName"
                placeholder="Street Name"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.streetName && touched.streetName && "border-red-500"
                }`}
              />
              <ErrorMessage
                name="streetName"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
              <Field
                type="text"
                name="city"
                placeholder="Town/City"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.townCity && touched.townCity && "border-red-500"
                }`}
              />
              <ErrorMessage
                name="city"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
              <Field
                type="text"
                name="postcode"
                placeholder="Postcode"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.postcode && touched.postcode && "border-red-500"
                }`}
              />
              <ErrorMessage
                name="postcode"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
            <Field
              as="select"
              name="country"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            >
              {/* Add options for countries in Europe */}
              <option value="" label="Select a country" />
              <option value="AL" label="Albania" />
              <option value="AD" label="Andorra" />
              <option value="AT" label="Austria" />
              <option value="BY" label="Belarus" />
              <option value="BE" label="Belgium" />
              <option value="BA" label="Bosnia and Herzegovina" />
              <option value="BG" label="Bulgaria" />
              <option value="HR" label="Croatia" />
              <option value="CY" label="Cyprus" />
              <option value="CZ" label="Czech Republic" />
              <option value="DK" label="Denmark" />
              <option value="EE" label="Estonia" />
              <option value="FI" label="Finland" />
              <option value="FR" label="France" />
              <option value="DE" label="Germany" />
              <option value="GR" label="Greece" />
              <option value="HU" label="Hungary" />
              <option value="IS" label="Iceland" />
              <option value="IE" label="Ireland" />
              <option value="IT" label="Italy" />
              <option value="XK" label="Kosovo" />
              <option value="LV" label="Latvia" />
              <option value="LI" label="Liechtenstein" />
              <option value="LT" label="Lithuania" />
              <option value="LU" label="Luxembourg" />
              <option value="MK" label="North Macedonia" />
              <option value="MT" label="Malta" />
              <option value="MD" label="Moldova" />
              <option value="MC" label="Monaco" />
              <option value="ME" label="Montenegro" />
              <option value="NL" label="Netherlands" />
              <option value="NO" label="Norway" />
              <option value="PL" label="Poland" />
              <option value="PT" label="Portugal" />
              <option value="RO" label="Romania" />
              <option value="RU" label="Russia" />
              <option value="SM" label="San Marino" />
              <option value="RS" label="Serbia" />
              <option value="SK" label="Slovakia" />
              <option value="SI" label="Slovenia" />
              <option value="ES" label="Spain" />
              <option value="SE" label="Sweden" />
              <option value="CH" label="Switzerland" />
              <option value="TR" label="Turkey" />
              <option value="UA" label="Ukraine" />
              <option value="GB" label="United Kingdom" />
              <option value="VA" label="Vatican City" />
              {/* ... */}
            </Field>
              <ErrorMessage
                name="country"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
              <Field
                type="text"
                name="phoneNo"
                placeholder="Phone Number"
                className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                  errors.phoneNumber && touched.phoneNumber && "border-red-500"
                }`}
              />
              <ErrorMessage
                name="phoneNo"
                component="p"
                className="text-red-500 mt-1 ml-2"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
              <Field
                as="select"
                name="timeZone"
                className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              >
                {/* Add options for countries in Europe */}
                <option value="" label="Select a timezone" />
                <option value="Europe/London" label="London (GMT)" />
                <option value="Europe/Paris" label="Paris (GMT+1)" />
                <option value="Europe/Berlin" label="Berlin (GMT+1)" />
                <option value="Europe/Madrid" label="Madrid (GMT+1)" />
                <option value="Europe/Rome" label="Rome (GMT+1)" />
                <option value="Europe/Amsterdam" label="Amsterdam (GMT+1)" />
                <option value="Europe/Brussels" label="Brussels (GMT+1)" />
                <option value="Europe/Oslo" label="Oslo (GMT+1)" />
                <option value="Europe/Stockholm" label="Stockholm (GMT+1)" />
                <option value="Europe/Copenhagen" label="Copenhagen (GMT+1)" />
                <option value="Europe/Warsaw" label="Warsaw (GMT+1)" />
                <option value="Europe/Prague" label="Prague (GMT+1)" />
                <option value="Europe/Budapest" label="Budapest (GMT+1)" />
                <option value="Europe/Athens" label="Athens (GMT+2)" />
                <option value="Europe/Istanbul" label="Istanbul (GMT+3)" />
                <option value="Europe/Moscow" label="Moscow (GMT+3)" />
                <option value="Europe/Helsinki" label="Helsinki (GMT+2)" />
                <option value="Europe/Bratislava" label="Bratislava (GMT+1)" />
                <option value="Europe/Vienna" label="Vienna (GMT+1)" />
                <option value="Europe/Lisbon" label="Lisbon (GMT)" />
                <option value="Europe/Dublin" label="Dublin (GMT)" />
                {/* ... */}
              </Field>
              <ErrorMessage
                name="timeZone"
                component="span"
                className="text-red-500"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
              <div className="relative w-full">
                <Field
                  type={values.showPassword1 ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                    errors.password1 && touched.password1
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <img
                  src={eye}
                  alt="Toggle password visibility"
                  className={`absolute right-3 top-4 w-5 cursor-pointer ${
                    values.showPassword1 ? "hidden" : "block"
                  }`}
                  onClick={() =>
                    togglePasswordVisibility(1, setFieldValue, values)
                  }
                />
                <span
                  onClick={() =>
                    togglePasswordVisibility(1, setFieldValue, values)
                  }
                  className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
                    values.showPassword1 ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <FaEye size={20} color="#11133D" />
                </span>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 mt-1 ml-2"
                />
              </div>

              <div className="relative w-full">
                <Field
                  type={values.showPassword2 ? "text" : "password"}
                  name="password2"
                  placeholder="Confirm Password"
                  className={`border-[#CECED7] border-2 rounded-md p-3 w-full ${
                    errors.password2 && touched.password2 && "border-red-500"
                  }`}
                />
                <img
                  src={eye}
                  alt="Toggle password visibility"
                  className={`absolute right-3 top-4 w-5 cursor-pointer ${
                    values.showPassword2 ? "hidden" : "block"
                  }`}
                  onClick={() =>
                    togglePasswordVisibility(2, setFieldValue, values)
                  }
                />
                <span
                  onClick={() =>
                    togglePasswordVisibility(2, setFieldValue, values)
                  }
                  className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
                    values.showPassword2 ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <FaEye size={20} color="#11133D" />
                </span>
              </div>
            </div>

            {/* Password strength requirements */}
            <li className="text-sm sm:w-6/12 sm:-indent-5">
              Password must contain a special character, capital letter, and
              number
            </li>

            <div className="w-full">
              <p className="text-[#11133D] font-semibold mb-3">Main Picture</p>
              <div className="border-2 relative rounded border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full p-8">
                <p className="flex items-end mb-3">
                  <img src={cloud} alt="upload" className="w-6 mr-3" /> Drag &
                  drop or{" "}
                  <span className="text-[#0D1A8B] font-medium ml-1 underline">
                    {" "}
                    Upload Here
                  </span>
                </p>
                <p>JPEG/PNG size 160*160 pixels</p>
                <input
                  name="imageField"
                  type="file"
                  className="absolute bg-slate-500 inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-[#0D1A8B] text-white p-3 rounded-md w-100"
            >
              Sign Me Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
