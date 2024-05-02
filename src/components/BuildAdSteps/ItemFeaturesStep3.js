import React, { useContext, useEffect, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field, FieldArray, useFormikContext } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import {
  engineCount,
  engine_count,
  propeller,
  yearsArray,
} from "../../utils/DummyData";
import { AuthContext } from "../../Context/AuthContext";
import { FormField } from "../FormField";
import CustomDropdownMenu from "../CustomDropdownMenu";
import ModificationMenu from "./AdComponents/ModificationMenu.js";
import ContentToggle from "../ItemDetailsPage/ToggleContent.js";
import Tabs from "../Tabs.js";
import MachinaryForm from "./AdComponents/MachinaryForm.js";
import { SERVER_BASE_URL, bigBoats } from "../../index.js";
import { handleInputChange } from "../../utils/handleInputChange.js";
import axios from "axios";

const ItemFeaturesStep3 = ({ isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();
  const [showBorder, setShowBorders] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showEngine, setShowEngine] = useState(true);
  const [showPower, setShowPower] = useState(true);
  const [showTanks, setShowTanks] = useState(true);
  const [showMachinary, setShowMachinary] = useState(true);
  const [selectedTab, setSelectedTab] = useState("bow");
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

  const {
    makes,
    types,
    conditions,
    dispatch,
    modificationCheckboxes,
    convenienceCheckboxes,
    featuresCheckboxes,
    accessoriesCheckboxes,
    selectedCategory,
  } = useContext(AuthContext);

  const { advert } = Object(values);
  let {
    modifications,
    features,
    conveniences,
    accessories,
    category,
    engines,
    selected_engine,
    engine_count,
    fuel_tanks,
    fuel_tanks_capacity,
    water_tanks,
    water_tanks_capacity,
    holding_tanks,
    holding_tanks_capacity,
    powers,
  } = Object(advert);

  console.log(engines);

  const digits = isEditMode ? Array?.from(engine_count || [])?.map(Number) : [];

  const totalNumber = digits?.reduce((acc, digit) => acc + digit, 0);

  const fetchModalsByMake = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${
          isEditMode
            ? engines[selected_engine]?.make
            : values?.engines[values?.selected_engine]?.make
        }&category_id=${isEditMode ? category?.id : selectedCategory?.id}`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let engineMakeValue;
  const selectedEngine = values?.selected_engine || 0;
  const condition = isEditMode ? engines : values?.engines;
  if (condition != undefined) {
    engineMakeValue = isEditMode
      ? engines[selected_engine]?.make
      : values?.engines[selectedEngine]?.make;
  }

  // useEffect(() => {
  //   fetchModalsByMake();
  // }, [engineMakeValue]);

  console.log(advert);

  useEffect(() => {
    if (selectedCategory && engineMakeValue) {
      fetchModalsByMake();
    }
  }, [selectedCategory, engineMakeValue]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { id: "bow", label: "Bow Thruster" },
    { id: "stern", label: "Stern Thruster" },
    { id: "generator", label: "Generator" },
  ];

  const valueToCheck = isEditMode ? selected_engine : values.selected_engine;

  const categoryToCheck = isEditMode
    ? category?.slug
    : selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    if (isEditMode && selectedCategory?.id == undefined) {
      dispatch({
        type: "SELECTED_CATEGORY",
        payload: { name: category?.name, id: category?.id },
      });
      // Remove selectedCategory.id from dependency array to stop the effect
      return;
    }
  }, [advert, isEditMode, category, selectedCategory?.id]);

  let powersArray = powers?.map((item) => item.name);

  function generateUniqueId(maxId) {
    return maxId + 1;
  }

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const valueToModify = [...powers]; // Make a copy of the powers array

    if (checked) {
      // Add the new power item
      valueToModify.push({
        id: generateUniqueId(
          valueToModify.reduce((max, item) => Math.max(max, item.id), 0)
        ),
        name: value,
        advert_id: advert?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } else {
      // Remove the power item
      const indexToRemove = valueToModify.findIndex(
        (item) => item.name === value
      );
      if (indexToRemove !== -1) {
        valueToModify.splice(indexToRemove, 1);
      }
    }

    setFieldValue(`advert.${name}`, valueToModify);
  };

  return (
    <>
      <BuildLayout heading="Items Features">
        {bigBoats.includes(categoryToCheck) ? (
          <>
            <ContentToggle
              setShowContent={setShowEngine}
              title="Engine"
              textStyles="font-semibold text-[#11133D]"
              className="flex justify-between border-2 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
            />
            <div className={showEngine ? "block" : "hidden"}>
              <div className="mb-4">
                <CategorySelectDropdown
                  label="Engine"
                  name="engine_count"
                  options={engineCount}
                  value={
                    isEditMode
                      ? `${
                          Number.isNaN(totalNumber)
                            ? "Sail Driven"
                            : totalNumber
                        }`
                      : values?.engine_count
                  }
                  onChange={(e) => {
                    isEditMode
                      ? handleInputChange(
                          e,
                          // "engine_count",
                          // engineCount,
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
                  }}
                />
              </div>
              <FieldArray name="engines">
                {({ push, remove, form: { errors, touched } }) => {
                  return (
                    <>
                      <div className="flex gap-4 sm:flex-nowrap flex-wrap mb-4">
                        {Array.from({
                          length: isEditMode
                            ? totalNumber
                            : values.engine_count,
                        }).map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              isEditMode
                                ? setFieldValue("advert.selected_engine", index)
                                : (values.selected_engine = index);
                              setShowBorders(true);
                              setRefresh((prev) => !prev);
                            }}
                            className={`text-sm ${
                              valueToCheck == index
                                ? "bg-[#0D1A8B] text-white rounded-md"
                                : "bg-white text-[#8891B2] border-2 border-[#e0deee] rounded-md"
                            } px-3 py-2 rounded-md"
            }`}
                          >
                            Engine {index + 1}
                          </button>
                        ))}
                      </div>
                      <div
                        className={` rounded-md ${
                          showBorder ? "p-4 mt-4 border border-gray-200" : ""
                        } `}
                      >
                        {Array.from({
                          length: isEditMode
                            ? totalNumber
                            : values.engine_count,
                        }).map((_, index) => (
                          <div key={index}>
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
                              {valueToCheck == index && (
                                <>
                                  {isCustomMakeSelected ? (
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.make`}
                                      label="Make"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Make"}
                                      value={
                                        isEditMode
                                          ? engines[selected_engine]?.make
                                          : values?.engines[selected_engine]
                                              ?.make
                                      }
                                      // value={modelValue}
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
                                      valueAsString={true}
                                      addCustomOption={true}
                                      label="Make"
                                      name={`engines.${index}.make`}
                                      options={makes}
                                      value={
                                        isEditMode
                                          ? engines[selected_engine]?.make
                                          : values?.engines[selected_engine]
                                              ?.make
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

                                  {isCustomModelSelected ? (
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.model`}
                                      label="Model"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Model"}
                                      value={
                                        isEditMode
                                          ? engines[selected_engine]?.model
                                          : values?.engines[selected_engine]
                                              ?.model
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
                                      valueAsString={true}
                                      label="Model"
                                      name={`engines.${index}.model`}
                                      options={modals}
                                      addCustomOption={true}
                                      value={
                                        isEditMode
                                          ? engines[selected_engine]?.model
                                          : values?.engines[selected_engine]
                                              ?.model
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
                                </>
                              )}
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                              {valueToCheck == index && (
                                <>
                                  <CategorySelectDropdown
                                    label="Condition"
                                    name={`engines.${index}.condition`}
                                    options={conditions}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.condition_id
                                        : values?.engines[selected_engine]
                                            ?.condition
                                    }
                                    onChange={(e) => {
                                      isEditMode
                                        ? handleInputChange(
                                            e,
                                            "condition",
                                            conditions,
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
                                    label="Type"
                                    name={`engines.${index}.type`}
                                    options={types}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.type_id
                                        : values?.engines[selected_engine]?.type
                                    }
                                    onChange={(e) => {
                                      isEditMode
                                        ? handleInputChange(
                                            e,
                                            "type",
                                            types,
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
                                </>
                              )}
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                              {valueToCheck == index && (
                                <>
                                  <FormField
                                    FieldType="number"
                                    inputField={true}
                                    name={`engines.${index}.hours`}
                                    label="Hours (Optional)"
                                    className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                    placeholder={"Hours (HRS)"}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.hours
                                        : values?.engines[selected_engine]
                                            ?.hours
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
                                    name={`engines.${index}.year`}
                                    options={yearsArray}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.year
                                        : values?.engines[selected_engine]?.year
                                    }
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
                                </>
                              )}
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                              {valueToCheck == index && (
                                <>
                                  <FormField
                                    FieldType="text"
                                    inputField={true}
                                    name={`engines.${index}.capacity`}
                                    label="Capacity (Optional)"
                                    className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                    placeholder={"Capacity"}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.capacity
                                        : values?.engines[selected_engine]
                                            ?.capacity
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
                                    name={`engines.${index}.power`}
                                    label="Power (Optional)"
                                    className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                    placeholder={"Power"}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.power
                                        : values?.engines[selected_engine]
                                            ?.power
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
                                </>
                              )}
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                              {valueToCheck === index && (
                                <>
                                  <FormField
                                    FieldType="text"
                                    inputField={true}
                                    name={`engines.${index}.fuel`}
                                    label="Fuel (Optional)"
                                    className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                    placeholder={"Fuel"}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.fuel
                                        : values?.engines[selected_engine]?.fuel
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
                                    name={`engines.${index}.service_history`}
                                    label="Service History (Optional)"
                                    className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                    placeholder={"Service History"}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]
                                            ?.service_history
                                        : values?.engines[selected_engine]
                                            ?.service_history
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
                                </>
                              )}
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                              {values.selected_engine === index && (
                                <>
                                  <CategorySelectDropdown
                                    label="Propeller"
                                    name={`engines.${index}.propeller`}
                                    options={propeller}
                                    value={
                                      isEditMode
                                        ? engines[selected_engine]?.propeller
                                        : values?.engines[selected_engine]
                                            ?.propeller
                                    }
                                    onChange={(e) =>
                                      isEditMode
                                        ? handleInputChange(
                                            e,
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
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                }}
              </FieldArray>
            </div>
            <ContentToggle
              setShowContent={setShowMachinary}
              title="Machinary"
              textStyles="font-semibold text-[#11133D]"
              className="flex justify-between border-2 mt-4 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
            />
            <div className={showMachinary ? "block" : "hidden"}>
              <div className="sm:overflow-x-hidden overflow-x-scroll userProfileTab">
                <Tabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  handleTabClick={handleTabClick}
                  className="xl:text-base text-sm sm:w-auto w-[700px]"
                />
              </div>

              <div className="py-6">
                {selectedTab === "bow" && (
                  <MachinaryForm
                    isEditMode={isEditMode}
                    formFor="bow"
                    makes={makes}
                  />
                )}
                {selectedTab === "stern" && (
                  <MachinaryForm
                    isEditMode={isEditMode}
                    formFor="stern"
                    makes={makes}
                  />
                )}
                {selectedTab === "generator" && (
                  <MachinaryForm
                    isEditMode={isEditMode}
                    formFor="generator"
                    makes={makes}
                  />
                )}
              </div>
            </div>
            <ContentToggle
              setShowContent={setShowTanks}
              title="Tanks"
              textStyles="font-semibold text-[#11133D]"
              className="flex justify-between border-2 mt-4 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
            />
            <div className={showTanks ? "block" : "hidden"}>
              <p className="block text-[#11133D] text-sm font-medium mb-4">
                {" "}
                Fresh Water Tanks (Optional)
              </p>
              <div className="flex sm:flex-row flex-col gap-4">
                <FormField
                  FieldType="number"
                  inputField={true}
                  name={`water_tanks`}
                  label="No Of Tanks"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"No Of Tanks"}
                  value={isEditMode ? water_tanks : values?.water_tanks}
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
                  inputField={true}
                  label="Total Capacity"
                  name="water_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
                  value={
                    isEditMode
                      ? water_tanks_capacity
                      : values?.water_tanks_capacity
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
              <p className="block text-[#11133D] text-sm font-medium mb-4">
                {" "}
                Fuel Tanks (Optional)
              </p>
              <div className="flex sm:flex-row flex-col gap-4">
                <FormField
                  FieldType="number"
                  inputField={true}
                  name={`fuel_tanks`}
                  label="No Of Tanks"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"No Of Tanks"}
                  value={isEditMode ? fuel_tanks : values?.fuel_tanks}
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
                  inputField={true}
                  label="Total Capacity"
                  name="fuel_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
                  value={
                    isEditMode
                      ? fuel_tanks_capacity
                      : values?.fuel_tanks_capacity
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
              <p className="block text-[#11133D] text-sm font-medium mb-4">
                {" "}
                Holding Tanks (Optional)
              </p>
              <div className="flex sm:flex-row flex-col gap-4">
                <FormField
                  FieldType="number"
                  inputField={true}
                  name={`holding_tanks`}
                  label="No Of Tanks"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"No Of Tanks"}
                  value={isEditMode ? holding_tanks : values?.holding_tanks}
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
                  inputField={true}
                  label="Total Capacity"
                  name="holding_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
                  value={
                    isEditMode
                      ? holding_tanks_capacity
                      : values?.holding_tanks_capacity
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
            </div>
            <ContentToggle
              setShowContent={setShowPower}
              title="Power"
              textStyles="font-semibold text-[#11133D]"
              className="flex justify-between border-2 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
            />
            <div className={showPower ? "block" : "hidden"}>
              <p className="block text-[#11133D] text-sm font-medium mb-4">
                {" "}
                Solar Panel (Optional)
              </p>
              <div className="flex items-center gap-5 sm:flex-nowrap flex-wrap">
                {["12V", "110V", "240V", "3 Phase", "USB"].map(
                  (checkbox, index) => {
                    return (
                      <label
                        className="flex text-sm text-[#11133D]"
                        key={index}
                      >
                        <Field
                          type="checkbox"
                          value={checkbox}
                          name="powers"
                          className="min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                          // onChange={handleCheckboxChange}
                          {...(isEditMode && {
                            checked: powers?.some(
                              (item) => item.name === checkbox
                            ),
                            onChange: (e) => handleCheckboxChange(e),
                          })}
                        />
                        {checkbox}
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col  gap-4">
              <div className="w-full">
                <label className="block text-[#11133D] text-sm font-medium mb-2">
                  Modifications
                </label>
                <CustomDropdownMenu
                  buttonStyles="w-full text-sm "
                  buttonToOpenMenu={
                    <>
                      <p className="border-[#CECED7] text-[#8891B2] px-3 py-[13px] border-2 rounded-md  w-full text-left">
                        {isEditMode
                          ? modifications?.length > 0
                            ? modifications.map((item) => item.name).join(", ")
                            : "Select Modifications"
                          : modificationCheckboxes
                              .filter((modification) =>
                                values?.modifications.includes(modification)
                              )
                              .join(", ") || "Select Modifications"}
                      </p>
                    </>
                  }
                  children={
                    <ModificationMenu
                      isEditMode={isEditMode}
                      menuLabel="Select Modification"
                      MenuFor={modificationCheckboxes}
                      dispatch={dispatch}
                      actionType="UPDATE_MODIFICATIONS"
                      name="modifications"
                    />
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-[#11133D] text-sm font-medium mb-2">
                  Features
                </label>
                <CustomDropdownMenu
                  buttonStyles="w-full text-sm "
                  buttonToOpenMenu={
                    <>
                      <p className="border-[#CECED7] text-[#8891B2] px-3 py-[13px] border-2 rounded-md  w-full text-left">
                        {isEditMode
                          ? features?.length > 0
                            ? features.map((item) => item.name).join(", ")
                            : "Select Features"
                          : featuresCheckboxes
                              .filter((features) =>
                                values?.features.includes(features)
                              )
                              .join(", ") || "Select Features"}
                      </p>
                    </>
                  }
                  children={
                    <ModificationMenu
                      menuLabel="Select Feature"
                      MenuFor={featuresCheckboxes}
                      dispatch={dispatch}
                      actionType="UPDATE_FEATURES"
                      name="features"
                      isEditMode={isEditMode}
                    />
                  }
                />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col mt-4 gap-4">
              <div className="w-full">
                <label className="block text-[#11133D] text-sm font-medium mb-2">
                  Convenience
                </label>
                <CustomDropdownMenu
                  buttonStyles="w-full text-sm "
                  buttonToOpenMenu={
                    <>
                      <p className="border-[#CECED7] text-[#8891B2] px-3 py-[13px] border-2 rounded-md  w-full text-left">
                        {isEditMode
                          ? conveniences?.length > 0
                            ? conveniences.map((item) => item.name).join(", ")
                            : "Select Conveniences"
                          : convenienceCheckboxes
                              .filter((conveniences) =>
                                values?.conveniences.includes(conveniences)
                              )
                              .join(", ") || "Select Conveniences"}
                      </p>
                    </>
                  }
                  children={
                    <ModificationMenu
                      menuLabel="Select Convenience"
                      MenuFor={convenienceCheckboxes}
                      dispatch={dispatch}
                      actionType="UPDATE_CONVENIENCE"
                      name="conveniences"
                      isEditMode={isEditMode}
                    />
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-[#11133D] text-sm font-medium mb-2">
                  Accessories
                </label>
                <CustomDropdownMenu
                  buttonStyles="w-full text-sm "
                  buttonToOpenMenu={
                    <>
                      <p className="border-[#CECED7] text-[#8891B2] px-3 py-[13px] border-2 rounded-md  w-full text-left">
                        {isEditMode
                          ? accessories?.length > 0
                            ? accessories.map((item) => item.name).join(", ")
                            : "Select Accessories"
                          : accessoriesCheckboxes
                              .filter((accessories) =>
                                values?.accessories.includes(accessories)
                              )
                              .join(", ") || "Select Accessories"}
                      </p>
                    </>
                  }
                  children={
                    <ModificationMenu
                      menuLabel="Select Accessory"
                      MenuFor={accessoriesCheckboxes}
                      dispatch={dispatch}
                      actionType="UPDATE_ACCESSORIES"
                      name="accessories"
                      isEditMode={isEditMode}
                    />
                  }
                />
              </div>
            </div>
          </>
        )}
      </BuildLayout>
    </>
  );
};

export default ItemFeaturesStep3;
