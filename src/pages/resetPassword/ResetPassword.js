import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { resetPasswordValidationSchema } from "../../utils/ValidationSchema";

const ResetPassword = () => {
  const naviage = useNavigate();
  const initialValues = {
    otp: "",
    password: "",
  };
  const [spinner, setSpinner] = useState(false);
  const forgetPasswordHandler = async (values) => {
    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/reset-password`,
        values
      );
      toast.success(data.message);
      setSpinner(false);
      naviage("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setSpinner(false);
    }
  };

  return (
    <>
      <Link to="/">
        {" "}
        <img className="w-32 mt-4 ml-4 block" src={logo} alt="logo" />
      </Link>
      <div className="sm:w-[400px] mx-auto mt-28 px-6">
        <p className="text-[#0D1A8B] font-semibold text-xl">
          Reset Your Password
        </p>
        <p className="text-sm text-[#696E9D]">
          Enter The OTP you have received on your registered Email
        </p>
        <Formik
          onSubmit={forgetPasswordHandler}
          initialValues={initialValues}
          validationSchema={resetPasswordValidationSchema}
        >
          <Form>
            <Field
              type="number"
              name="otp"
              placeholder="Enter your OTP"
              className={`border-[#CECED7] text-sm text-[#8891B2] border-2 rounded-md p-3 w-full mt-6`}
            />
            <ErrorMessage
              name="otp"
              component="p"
              className="text-red-500 mt-1 ml-2"
            />
            <Field
              type="password"
              name="password"
              placeholder="Enter your New Password"
              className={`border-[#CECED7] text-sm text-[#8891B2] border-2 rounded-md p-3 w-full mt-6`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 mt-1 ml-2"
            />
            <button
              type="submit"
              disabled={spinner}
              className="w-full mt-6 bg-[#0D1A8B] hover:bg-[#0a1dbd] font-medium text-white px-6 py-3 rounded cursor-pointer"
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
                "Reset Password"
              )}
            </button>
            <Link
              to="/login"
              className="text-[#0D1A8B] text-sm font-medium underline mt-4 block text-center"
            >
              Back To Login
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ResetPassword;
