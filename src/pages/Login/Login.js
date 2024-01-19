import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header/Header";
import { useLogin } from "../../Hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useLogin(); // Use the custom hook
  const user = localStorage.getItem("user");
  console.log(user);

  const validationSchema = Yup.object({
    email: Yup.string().required("email or email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Use the login function from the custom hook
        await login(values.email, values.password);
      } catch (error) {
        console.error("Login Error:", error);
      }
    },
  });

  if (user) return <Navigate to="/dashboard" />;

  return (
    <>
      <Header />
      <div className="flex flex-row h-screen">
        {/* Left side */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-white">
          <div className="w-4/5">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Log in to your account
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="email or email address"
                className={`w-full px-4 py-2 border rounded mb-4 text-gray-600 ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded mb-4 text-gray-600 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : ""
                }`}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-700 text-white px-6 py-3 rounded cursor-pointer"
              >
                Login
              </button>
            </form>

            <p className="text-gray-300 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-gray-100">
                Sign up
              </Link>
            </p>
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
