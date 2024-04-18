import React from "react";
import BuildLayout from "./BuildLayout";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { TagsInput } from "../TagsInput";
import { handleInputChange } from "../../utils/handleInputChange";

const NotesSteps4 = ({ isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();
  const { advert } = Object(values);

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
                name="description"
                placeholder="Description"
                className="border-[#CECED7] text-sm min-h-[150px] text-[#8891B2] border-2 rounded-md p-3 w-full"
                resize="vertical"
                value={isEditMode ? advert?.description : values?.description}
                onChange={(e) =>
                  isEditMode
                    ? handleInputChange(
                        e,
                        null,
                        null,
                        "advert",
                        isEditMode,
                        setFieldValue
                      )
                    : handleInputChange(
                        e,
                        null,
                        null,
                        null,
                        isEditMode,
                        setFieldValue
                      )
                }
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
