import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";
import { SERVER_BASE_URL } from "../..";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const CounterOffer = ({ onClose, id }) => {
  console.log(id);
  const initialValues = {
    counter_offer: "",
  };
  const [spinner, setSpinner] = useState(false);
  const handleFormSubmit = async (values) => {
    // Your logic for handling form submission
    console.log(values);
    setSpinner(true);

    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/counter-offer/${id}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      setSpinner(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border-t-8 border-[#0D1A8B] p-3">
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
          <FaDollarSign size={22} color="#0D1A8B" />
          <p className="text-[#0D1A8B] font-semibold ml-3">
            Make a Counter Offer
          </p>
        </div>
        <FaTimes
          className="cursor-pointer"
          onClick={onClose}
          color="#696E9D"
          size={24}
        />
      </div>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        <Form className="mt-8">
          <label className="text-[#11133D] font-medium mb-2 block">
            Enter Counter Price
          </label>
          <Field
            name="counter_offer"
            type="number"
            className="border-[#CECED7] rounded-md font-semibold outline-none border-2 py-2 px-3 text-[#11133D] w-full"
          />
          <ErrorMessage
            component="span"
            className="error"
            name="counter_offer"
          />
          <button
            type="submit"
            className="bg-[#0D1A8B] hover:bg-[#0a1dbd] min-w-[100%] text-white w-full rounded-lg font-semibold py-3 mt-5"
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
              "Submit"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CounterOffer;
