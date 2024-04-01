import React from "react";
import BuildLayout from "./BuildLayout";
import { ErrorMessage, Field } from "formik";
import { TagsInput } from "../TagsInput";

const NotesSteps4 = ({ isEditMode }) => {
  return (
    <>
      <BuildLayout heading="Notes">
        <Field name="tags" component={TagsInput} isEditMode={isEditMode} />
        <Field
          name="description"
          children={({ field }) => (
            <>
              <label
                htmlFor={field.name}
                className="block text-[#11133D] text-sm font-medium mb-2 mt-7"
              >
                Description
              </label>
              <Field
                as="textarea"
                id={field.name}
                placeholder="Description"
                className="border-[#CECED7] text-sm min-h-[150px] text-[#8891B2] border-2 rounded-md p-3 w-full"
                resize="vertical"
                {...field}
              />
              <ErrorMessage
                component="span"
                className="text-red-500 text-sm"
                name="description"
              />
            </>
          )}
        />
      </BuildLayout>
    </>
  );
};

export default NotesSteps4;
