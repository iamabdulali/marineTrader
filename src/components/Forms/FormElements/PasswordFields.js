import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { eye } from "../../../assets";

function PasswordFields() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 1) {
      setShowPassword1(!showPassword1);
    } else if (field === 2) {
      setShowPassword2(!showPassword2);
    }
  };

  return (
    <>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="relative w-full">
          <Field
            type={showPassword1 ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <img
            src={eye}
            alt="Toggle password visibility"
            className={`absolute right-3 top-4 w-5 cursor-pointer ${
              showPassword1 ? "hidden" : "block"
            }`}
            onClick={() => togglePasswordVisibility(1)}
          />
          <span
            onClick={() => togglePasswordVisibility(1)}
            className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
              showPassword1 ? "block" : "hidden"
            }`}
          >
            {" "}
            <FaEye size={20} color="#11133D" />
          </span>
          <ErrorMessage
            name="password"
            component="span"
            className="text-red-500"
          />
        </div>
        <div className="relative w-full">
          <Field
            name="confirmPassword"
            type={showPassword2 ? "text" : "password"}
            placeholder="Confirm Password"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
          />
          <img
            src={eye}
            alt="Toggle password visibility"
            className={`absolute right-3 top-4 w-5 cursor-pointer ${
              showPassword2 ? "hidden" : "block"
            }`}
            onClick={() => togglePasswordVisibility(2)}
          />
          <span
            onClick={() => togglePasswordVisibility(2)}
            className={`absolute right-3 top-[14px] w-5 cursor-pointer ${
              showPassword2 ? "block" : "hidden"
            }`}
          >
            {" "}
            <FaEye size={20} color="#11133D" />
          </span>
          <ErrorMessage
            name="confirmPassword"
            component="span"
            className="text-red-500"
          />
        </div>
      </div>
      <li className="text-sm sm:w-6/12 sm:-indent-5">
        Password must contain a special character, capital letter, and number
      </li>
    </>
  );
}

export default PasswordFields;
