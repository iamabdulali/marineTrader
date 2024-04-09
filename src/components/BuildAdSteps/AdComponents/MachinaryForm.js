import React, { useContext, useEffect, useState } from "react";
import { CategorySelectDropdown } from "../../CategorySelectDropdown";
import { AuthContext } from "../../../Context/AuthContext";
import { yearsArray } from "../../../utils/DummyData";
import { FormField } from "../../FormField";
import { handleInputChange } from "../../../utils/handleInputChange";
import axios from "axios";
import { SERVER_BASE_URL } from "../../..";
import { useFormikContext } from "formik";

const MachinaryForm = ({ formFor, isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();

  const { makes, selectedCategory } = useContext(AuthContext);
  const [modals, setModals] = useState([]);

  const [modelValue, setModelValue] = useState("");
  const [isCustomModelSelected, setIsCustomModelSelected] = useState(false);
  const [makeValue, setMakeValue] = useState("");
  const [isCustomMakeSelected, setIsCustomMakeSelected] = useState(false);

  const handleModelChange = (e) => {
    const selectedValue = e.target.value;
    setModelValue(selectedValue);
    setIsCustomModelSelected(selectedValue === "custom");
  };

  const handleMakeChange = (e) => {
    const selectedValue = e.target.value;
    setMakeValue(selectedValue);
    setIsCustomMakeSelected(selectedValue === "custom");
  };

  const fetchModalsByMake = async (makeValue) => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${makeValue}&category_id=${selectedCategory?.id}`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let makeValue = values?.[formFor]?.make;
    fetchModalsByMake(makeValue);
  }, [values?.[formFor]?.make, formFor]);

  console.log(values?.[formFor]?.model);

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-4 relative">
        {isCustomModelSelected || isCustomMakeSelected ? (
          <button
            onClick={() => {
              setIsCustomModelSelected(false);
              setIsCustomMakeSelected(false);
            }}
            type="button"
            className="absolute underline right-0 text-sm font-medium cursor-pointer text-[#11133D]"
          >
            Go Back
          </button>
        ) : (
          ""
        )}
        {isCustomMakeSelected ? (
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.make`}
            label="Make"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Make"}
            value={values?.[formFor]?.make}
            onChange={(e) => {
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
                  );
              setModelValue(e.target.value);
            }}
          />
        ) : (
          <CategorySelectDropdown
            addCustomOption={true}
            valueAsString={true}
            label="Make"
            name={`${formFor}.make`}
            options={makes}
            value={values?.[formFor]?.make}
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
              handleMakeChange(e);
            }}
          />
        )}

        {isCustomModelSelected ? (
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.model`}
            label="Model"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Model"}
            value={values?.[formFor]?.model}
            onChange={(e) => {
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
                  );
              setModelValue(e.target.value);
            }}
          />
        ) : (
          <CategorySelectDropdown
            addCustomOption={true}
            valueAsString={true}
            label="Model"
            name={`${formFor}.model`}
            options={modals}
            value={values?.[formFor]?.model}
            onChange={(e) => {
              isEditMode
                ? handleInputChange(
                    e,
                    "model",
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
              handleModelChange(e);
            }}
          />
        )}
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <FormField
          FieldType="text"
          inputField={true}
          name={`${formFor}.power`}
          label="Power"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
          placeholder={"Power (HP)"}
          value={isEditMode ? "length" : values?.[formFor]?.power}
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
          value={isEditMode ? "year" : values?.[formFor]?.year}
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
            value={isEditMode ? "consumption" : values?.[formFor]?.consumption}
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
            value={isEditMode ? "hours" : values?.[formFor]?.hours}
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
            isEditMode ? "service_history" : values?.[formFor]?.service_history
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
