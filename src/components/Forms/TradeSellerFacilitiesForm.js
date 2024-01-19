import { ErrorMessage, Field } from "formik";
import React from "react";

const TradeSellerFacilitiesForm = () => {
  return (
    <div>
      <div className="sm:mx-8 mx-3 text-sm">
        <div className="flex gap-4 sm:flex-row flex-col mt-20">
          <div className="w-full">
            <Field
              type="text"
              placeholder="First Name"
              name="firstName"
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            />
            <div>
              <ErrorMessage
                component="span"
                name="firstName"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="w-full">
            <Field
              className="border-[#CECED7] border-2 rounded-md p-3 w-full"
              type="text"
              placeholder="Last Name"
              name="lastName"
            />
            <ErrorMessage
              name="lastName"
              component="span"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <Field
            className="border-[#CECED7] border-2 rounded-md p-3 w-full"
            type="text"
            placeholder="Job Title"
            name="jobTitle"
          />
          <ErrorMessage
            name="jobTitle"
            component="span"
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TradeSellerFacilitiesForm;
