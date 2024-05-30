import { Field } from "formik";
import React from "react";
import FileInput from "./FormElements/FileInput";
import TradeSellerCompanyInfoForm from "./TradeSellerCompanyInfoForm";

const PrivateSellerSignUpForm = () => {
  return (
    <>
      <TradeSellerCompanyInfoForm />
      <div className="w-full">
        <Field
          name="image_field"
          component={FileInput}
          label="Cover Photo"
          accept="image/jpeg, image/png"
          fieldName="image_field"
          furtherStyles="top-3"
        />
        <p className="mt-2 font-medium">Upload an image of 156x156</p>
      </div>
    </>
  );
};

export default PrivateSellerSignUpForm;
