import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { logo } from "../../assets";
import { loginValidationSchema } from "../../utils/ValidationSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { SERVER_BASE_URL } from "../..";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [spinner, setSpinner] = useState(false);
  const { fcmToken, dispatch } = useContext(AuthContext);
  const NavigateTo = useNavigate();

  console.log(fcmToken);

  const onSubmit = async (values) => {
    setSpinner(true);
    const updatedValues = {
      ...values,
      fcm_token: fcmToken,
    };
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/login`,
        updatedValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.data });
      setSpinner(false);
      NavigateTo("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
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
      <div className="flex flex-row h-screen">
        {/* Left side */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-white">
          <div className="sm:w-4/5 w-full sm:p-0 px-6">
            <h2 className="text-2xl font-bold text-black">
              Log in to your account
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                    className={`border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full mt-6`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 mt-1 ml-2"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full mt-6`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 mt-1 ml-2"
                  />
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm text-[#0D1A8B] font-semibold block mt-3 text-right"
                >
                  Forgot Password?
                </Link>
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
                    "Login"
                  )}
                </button>
                <p className="text-[#696E9D] text-center mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#0D1A8B] font-medium underline"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 bg-gray-100 fixed top-0 bottom-0 right-0 md:block hidden">
          <img
            src={require("../../assets/ship.png")}
            alt="Ship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
