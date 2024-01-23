import React, { useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field } from "formik";
import { FaTimes } from "react-icons/fa";
import { TagsInput } from "../TagsInput";

const NotesSteps4 = () => {
  return (
    <>
      <BuildLayout heading="Notes">
        <Field
          name="description"
          children={({ field }) => (
            <>
              <label
                htmlFor={field.name}
                className="block text-[#11133D] text-sm font-medium mb-2"
              >
                Description
              </label>
              <Field
                as="textarea"
                id={field.name}
                placeholder="Description"
                className="border-[#CECED7] text-sm mb-4 text-[#8891B2] border-2 rounded-md p-3 w-full"
                resize="vertical"
                {...field}
              />
            </>
          )}
        />

        <Field name="tags" component={TagsInput} />
      </BuildLayout>
    </>
  );
};

export default NotesSteps4;
