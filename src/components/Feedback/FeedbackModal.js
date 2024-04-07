import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { feedbackValidationSchema } from "../../utils/ValidationSchema";

const FeedbackModal = () => {
  const [spinner, setSpinner] = useState(false);
  const initialValues = {
    type: "",
    description: "",
    subject: "",
  };

  const onSubmit = async (values) => {
    setSpinner(true);
    try {
      const { data } = await axios.post(`${SERVER_BASE_URL}/feedback`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(data.message);
      toast.success(
        "You will get Free Ads if the issue you highlighed is genuine"
      );
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={feedbackValidationSchema}
    >
      <Form>
        <p className="text-[#11133D] font-medium">
          We would love to hear your feedback
        </p>
        <p className="text-[#11133D]  text-sm mt-2">
          <span className="text-[#11133D] font-medium">Note:</span> You will get
          Free Ads if the issue your highlighed is genuine
        </p>
        <p className="text-[#11133D] font-medium text-sm mt-6">Select Type</p>
        <div className="mt-5 flex">
          <div className="radio">
            <Field id="bug" type="radio" name="type" value="bug" />
            <label htmlFor="bug" className="radio-label mr-5">
              Bug
            </label>
          </div>
          <div className="radio">
            <Field
              name="type"
              id="suggestion"
              type="radio"
              value="suggestion"
            />
            <label htmlFor="suggestion" className="radio-label mr-5">
              Suggestion
            </label>
          </div>
          <div className="radio">
            <Field name="type" id="other" type="radio" value="other" />
            <label htmlFor="other" className="radio-label">
              Other
            </label>
          </div>
        </div>
        <ErrorMessage
          component="p"
          name="type"
          className="text-sm text-red-500 mt-3 block"
        />

        <div>
          <p className="text-[#11133D] font-medium text-sm mt-6 mb-3">
            Subject
          </p>
          <Field
            type="text"
            placeholder="Write Here..."
            className="border-[#CECED7] text-sm  text-[#8891B2] border-2 rounded-md p-3 w-full"
            name="subject"
          />
          <ErrorMessage
            component="p"
            name="subject"
            className="text-sm text-red-500 mt-1 block"
          />
        </div>
        <div>
          <p className="text-[#11133D] font-medium text-sm mt-6 mb-3">
            Description
          </p>
          <Field
            as="textarea"
            placeholder="Write Here..."
            className="border-[#CECED7] text-sm min-h-[150px] text-[#8891B2] border-2 rounded-md p-3 w-full"
            resize="vertical"
            name="description"
          />
          <ErrorMessage
            component="p"
            name="description"
            className="text-sm text-red-500 mt-1 block"
          />
        </div>
        <button
          type="submit"
          className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 min-h-12 rounded-md block mt-6 w-28 ml-auto`}
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
            " Send"
          )}
        </button>
      </Form>
    </Formik>
  );
};

export default FeedbackModal;
