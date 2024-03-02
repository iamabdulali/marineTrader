import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { privateSellerValidationSchema } from "../../../utils/ValidationSchema.js";
import PrivateSellerSignUpForm from "../../../components/Forms/PrivateSellerSignUpForm.js";
import Ship from "../../../assets/ship.png";
import { logo } from "../../../assets/index.js";
import Heading from "../../../components/Heading.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../../utils/displayErrors.js";
import { Oval } from "react-loader-spinner";

const PrivateSeller = () => {
  const [spinner, setSpinner] = useState(false);
  const NavigateTo = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    building_number: "",
    street_name: "",
    city: "",
    postcode: "",
    country: "",
    region: "",
    currency: "",
    phone_no: "",
    timezone: "dasdad",
    password: "",
    sellerType: "private seller",
    image_field: "",
    user_name: "",
  };

  const onSubmit = async (values) => {
    setSpinner(true);
    try {
      const { data } = await axios.post(
        "https://marine.takhleeqsoft.com/api/private/register",
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
      setSpinner(false);
      NavigateTo("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return (
    <div className="flex">
      <div className="lg:w-7/12 p-4 w-full">
        <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        <Heading
          content="Signup As Private Seller"
          className="md:ml-8 mt-10 ml-0"
        />
        {/* Left side (Form) */}
        <Formik
          initialValues={initialValues}
          validationSchema={privateSellerValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-[#8891B2] text-sm md:mx-8 mx-0 mt-10"
            >
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
