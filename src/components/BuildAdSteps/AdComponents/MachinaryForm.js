import React, { useContext, useEffect, useState } from "react";
import { CategorySelectDropdown } from "../../CategorySelectDropdown";
import { AuthContext } from "../../../Context/AuthContext";
import { yearsArray } from "../../../utils/DummyData";
import { FormField } from "../../FormField";
import { handleInputChange } from "../../../utils/handleInputChange";
import axios from "axios";
import { SERVER_BASE_URL } from "../../..";
import { useFormikContext } from "formik";

const MachinaryForm = ({ formFor, isEditMode, makes }) => {
  const { values, setFieldValue } = useFormikContext();

  const { selectedCategory } = useContext(AuthContext);
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

  const { advert } = Object(values);
  let { category } = Object(advert);

  const fetchModalsByMake = async (makeValue) => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${makeValue}&category_id=${
          isEditMode ? category?.id : selectedCategory?.id
        }`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let makeValue = isEditMode
      ? advert?.[formFor]?.make
      : values?.[formFor]?.make;
    fetchModalsByMake(makeValue);
    if (selectedCategory && makeValue) {
      fetchModalsByMake(makeValue);
    }
    console.log(makeValue);
  }, [selectedCategory, makeValue]);

  console.log(advert?.[formFor]?.modal);

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
            value={
              isEditMode ? advert?.[formFor]?.make : values?.[formFor]?.make
            }
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
            value={
              isEditMode ? advert?.[formFor]?.make : values?.[formFor]?.make
            }
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

        {console.log(values)}

        {isCustomModelSelected ? (
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.modal`}
            label="Model"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Model"}
            value={
              isEditMode ? advert?.[formFor]?.modal : values?.[formFor]?.modal
            }
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
            name={`${formFor}.modal`}
            options={modals}
            value={
              isEditMode ? advert?.[formFor]?.modal : values?.[formFor]?.modal
            }
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
          value={
            isEditMode ? advert?.[formFor]?.power : values?.[formFor]?.power
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
        <CategorySelectDropdown
          label="Year"
          name={`${formFor}.year`}
          options={yearsArray}
          value={isEditMode ? advert?.[formFor]?.year : values?.[formFor]?.year}
          onChange={(e) =>
            isEditMode
              ? handleInputChange(
                  e,
                  "year",
                  yearsArray,
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
      {formFor === "generator" && (
        <div className="flex sm:flex-row flex-col gap-4">
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.consumption`}
            label="Consumption"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Consumption (LPH)"}
            value={
              isEditMode
                ? advert?.[formFor]?.consumption
                : values?.[formFor]?.consumption
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
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.hours`}
            label="Hours"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Hours (HRS)"}
            value={
              isEditMode ? advert?.[formFor]?.hours : values?.[formFor]?.hours
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
            isEditMode
              ? advert?.[formFor]?.service_history
              : values?.[formFor]?.service_history
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
