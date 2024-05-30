import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { privateSellerValidationSchema } from "../../../utils/ValidationSchema.js";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets/index.js";
import { Oval } from "react-loader-spinner";
import { Heading, PrivateSellerSignUpForm } from "../../../components/index.js";
import { privateSellerInitialValues } from "../../../utils/DummyData.js";
import useSignUp from "../../../Hooks/useSignUp.js";

const PrivateSeller = () => {
  const { signUp, spinner } = useSignUp();

  const handleSignUp = async (values) => {
    signUp(values, "private/register", "private");
  };

  return (
    <div className="flex">
      <div className="lg:w-7/12 p-4 w-full">
        <Link to="/register">
          <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        </Link>
        <Heading
          content="Signup As Private Seller"
          className="md:ml-8 mt-10 ml-0"
        />
        {/* Left side (Form) */}
        <Formik
          initialValues={privateSellerInitialValues}
          validationSchema={privateSellerValidationSchema}
          onSubmit={handleSignUp}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 text-[#8891B2] text-sm md:mx-8 mx-0 mt-10">
              <PrivateSellerSignUpForm
                setFieldValue={setFieldValue}
                values={values}
              />
              <button
                type="submit"
                disabled={spinner}
                className="bg-[#0D1A8B] text-white p-3 rounded-md"
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
                  " Sign Me Up"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-5/12 xl:static fixed right-0 lg:block hidden">
        <img className="xl:h-auto min-h-screen" src={Ship} alt="Ship" />
      </div>
    </div>
  );
};

export default PrivateSeller;
