import React, { useContext } from "react";
import { CategorySelectDropdown } from "../../CategorySelectDropdown";
import { AuthContext } from "../../../Context/AuthContext";
import { yearsArray } from "../../../utils/DummyData";
import { FormField } from "../../FormField";
import { handleInputChange } from "../../../utils/handleInputChange";

const MachinaryForm = ({ formFor, isEditMode, setFieldValue, values }) => {
  const { makes, modals } = useContext(AuthContext);

  console.log(values);

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-4">
        <CategorySelectDropdown
          label="Make"
          name={`${formFor}.make`}
          options={makes}
          value={values?.formFor?.make}
          onChange={(e) => {
            isEditMode
              ? handleInputChange(
                  e,
                  "make",
                  makes,
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
                );
          }}
        />
        <CategorySelectDropdown
          label="Model"
          name={`${formFor}.modal`}
          options={modals}
          value={values?.formFor?.modal}
          onChange={(e) => {
            isEditMode
              ? handleInputChange(
                  e,
                  "modal",
                  modals,
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
                );
          }}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <FormField
          FieldType="text"
          inputField={true}
          name={`${formFor}.power`}
          label="Power"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
          placeholder={"Power (HP)"}
          value={isEditMode ? "length" : values?.formFor?.power}
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
        <CategorySelectDropdown
          label="Year"
          name={`${formFor}.year`}
          options={yearsArray}
          value={isEditMode ? "year" : values?.formFor?.year}
          onChange={(e) =>
            isEditMode
              ? handleInputChange(e, "advert", isEditMode, setFieldValue)
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
      </div>
      {formFor === "generator" && (
        <div className="flex sm:flex-row flex-col gap-4">
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.consumption`}
            label="Consumption"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Consumption (LPH)"}
            value={isEditMode ? "consumption" : values?.formFor?.consumption}
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
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.hours`}
            label="Hours"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Hours (HRS)"}
            value={isEditMode ? "hours" : values?.formFor?.hours}
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
        </div>
      )}
      <div className="flex sm:flex-row flex-col gap-4">
        <FormField
          FieldType="text"
          inputField={true}
          name={`${formFor}.service_history`}
          label="Service History (Optional)"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
          placeholder={"Service History"}
          value={
            isEditMode ? "service_history" : values?.formFor?.service_history
          }
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
      </div>
    </>
  );
};

export default MachinaryForm;
