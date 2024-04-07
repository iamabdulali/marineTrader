import React, { useContext, useEffect, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field, FieldArray, useFormikContext } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { engineCount, propeller, yearsArray } from "../../utils/DummyData";
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

  const fetchModalsByMake = async () => {
    console.log(values);
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${
          values?.engines[values?.selectedEngine]?.make
        }&category_id=${selectedCategory?.id}`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let engineMakeValue;
  const selectedEngine = values?.selectedEngine || 0;
  if (values?.engines != undefined) {
    engineMakeValue = values?.engines[selectedEngine]?.make;
  }
  console.log(values?.engines);

  useEffect(() => {
    fetchModalsByMake();
  }, [engineMakeValue]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { id: "bow", label: "Bow Thruster" },
    { id: "stern", label: "Stern Thruster" },
    { id: "generator", label: "Generator" },
  ];

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
  const { modifications, features, conveniences, accessories } = Object(advert);

  return (
    <>
      <BuildLayout heading="Items Features">
        {bigBoats.includes(selectedCategory?.name) ? (
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
                  name="engineCount"
                  options={engineCount}
                  value={isEditMode ? values?.engineCount : values?.engineCount}
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
                  }}
                />
              </div>
              <FieldArray name="engines">
                {({ push, remove, form: { errors, touched } }) => {
                  return (
                    <>
                      <div className="flex gap-4 sm:flex-nowrap flex-wrap">
                        {Array.from({ length: values.engineCount }).map(
                          (_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                values.selectedEngine = index;
                                setShowBorders(true);
                                setRefresh((prev) => !prev);
                              }}
                              className={`text-sm ${
                                values.selectedEngine === index
                                  ? "bg-[#0D1A8B] text-white rounded-md"
                                  : "bg-white text-[#8891B2] border-2 border-[#e0deee] rounded-md"
                              } px-3 py-2 rounded-md"
            }`}
                            >
                              Engine {index + 1}
                            </button>
                          )
                        )}
                      </div>
                      <div
                        className={` rounded-md ${
                          showBorder ? "p-4 mt-4 border border-gray-200" : ""
                        } `}
                      >
                        {Array.from({ length: values.engineCount }).map(
                          (_, index) => (
                            <div key={index}>
                              <div className="flex sm:flex-row flex-col gap-4">
                                {values.selectedEngine == index && (
                                  <>
                                    <CategorySelectDropdown
                                      label="Make"
                                      name={`engines.${index}.make`}
                                      options={makes}
                                      value={
                                        values?.engines[selectedEngine]?.make
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
                                      }}
                                    />
                                    <CategorySelectDropdown
                                      label="Model"
                                      name={`engines.${index}.model`}
                                      options={modals}
                                      value={
                                        values?.engines[selectedEngine]?.model
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
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                              <div className="flex sm:flex-row flex-col gap-4">
                                {values.selectedEngine === index && (
                                  <>
                                    <CategorySelectDropdown
                                      label="Condition"
                                      name={`engines.${index}.condition`}
                                      options={conditions}
                                      value={
                                        values?.engines[selectedEngine]
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
                                        values?.engines[selectedEngine]?.type
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
                                {values.selectedEngine === index && (
                                  <>
                                    <FormField
                                      FieldType="number"
                                      inputField={true}
                                      name={`engines.${index}.hours`}
                                      label="Hours (Optional)"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Hours (HRS)"}
                                    />
                                    <CategorySelectDropdown
                                      label="Year"
                                      name={`engines.${index}.year`}
                                      options={yearsArray}
                                    />
                                  </>
                                )}
                              </div>
                              <div className="flex sm:flex-row flex-col gap-4">
                                {values.selectedEngine === index && (
                                  <>
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.capacity`}
                                      label="Capacity (Optional)"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Capacity"}
                                    />
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.power`}
                                      label="Power (Optional)"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Power"}
                                    />
                                  </>
                                )}
                              </div>
                              <div className="flex sm:flex-row flex-col gap-4">
                                {values.selectedEngine === index && (
                                  <>
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.fuel`}
                                      label="Fuel (Optional)"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Fuel"}
                                    />
                                    <FormField
                                      FieldType="text"
                                      inputField={true}
                                      name={`engines.${index}.service_history`}
                                      label="Service History (Optional)"
                                      className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                                      placeholder={"Service History"}
                                    />
                                  </>
                                )}
                              </div>
                              <div className="flex sm:flex-row flex-col gap-4">
                                {values.selectedEngine === index && (
                                  <>
                                    <CategorySelectDropdown
                                      label="Propeller"
                                      name={`engines.${index}.propeller`}
                                      options={propeller}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        )}
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
                    values={values}
                    setFieldValue={setFieldValue}
                    isEditMode={isEditMode}
                    formFor="bow"
                    index={0}
                  />
                )}
                {selectedTab === "stern" && (
                  <MachinaryForm
                    values={values}
                    setFieldValue={setFieldValue}
                    isEditMode={isEditMode}
                    formFor="stern"
                    index={0}
                  />
                )}
                {selectedTab === "generator" && (
                  <MachinaryForm
                    values={values}
                    setFieldValue={setFieldValue}
                    isEditMode={isEditMode}
                    formFor="generator"
                    index={0}
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
                />
                <FormField
                  inputField={true}
                  label="Total Capacity"
                  name="water_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
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
                />
                <FormField
                  inputField={true}
                  label="Total Capacity"
                  name="fuel_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
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
                />
                <FormField
                  inputField={true}
                  label="Total Capacity"
                  name="holding_tanks_capacity"
                  className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                  placeholder={"Total Capacity (LTRS)"}
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
                          value={`${checkbox}`}
                          name="powers"
                          className="min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
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
