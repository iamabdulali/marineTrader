import React from "react";
import { FormField } from "../FormField";
import { Formik, Form } from "formik";

const MakeOfferForm = ({ initialValues, handleFormSubmit }) => {
  return (
    <>
      {" "}
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        <Form>
          <FormField
            inputField={true}
            FieldType="text"
            name="name"
            label="Name"
            className="w-full border-2 px-3 py-3 rounded-md"
          />
          <FormField
            inputField={true}
            FieldType="email"
            name="email"
            label="Email"
            className="w-full border-2 px-3 py-3 rounded-md"
          />
          <FormField
            inputField={true}
            FieldType="tel"
            name="telephone"
            label="Telephone"
            className="w-full border-2 px-3 py-3 rounded-md"
          />
          <FormField
            inputField={true}
            FieldType="text"
            name="offer"
            label="Offer"
            className="w-full border-2 px-3 py-3 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-[#0D1A8B] hover:bg-[#0a1dbd] my-5 text-white rounded-md p-3 font-medium "
          >
            Make Offer
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default MakeOfferForm;
