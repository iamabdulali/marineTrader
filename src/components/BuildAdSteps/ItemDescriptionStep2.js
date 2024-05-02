import React, { useContext, useEffect, useState } from "react";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { FormField } from "../FormField";
import UpdateSubtitleNotice from "../UpdateSubtitleNotice";
import BuildLayout from "./BuildLayout";
import { AuthContext } from "../../Context/AuthContext";
import {
  colors,
  hullMaterialArray,
  hullShapes,
  keelTypeArray,
  serviceHistory,
  status,
  trailers,
  yearsArray,
} from "../../utils/DummyData";
import ContentToggle from "../ItemDetailsPage/ToggleContent";
import {
  SERVER_BASE_URL,
  advertPackages,
  bigBoats,
  categoriesList,
} from "../..";
import { useFormikContext } from "formik";
import { handleInputChange } from "../../utils/handleInputChange";
import axios from "axios";

const ItemDescriptionStep2 = ({ isEditMode }) => {
  const { selectedCategory, conditions, makes, types, dispatch, refresh } =
    useContext(AuthContext);

  const [showDetails, setShowDetails] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showPerformance, setShowPerformance] = useState(true);

  const { values, setFieldValue } = useFormikContext();

  const { advert } = Object(values);

  const {
    title,
    sub_title,
    make,
    model,
    condition,
    type,
    color,
    service_history,
    hours,
    year,
    length,
    trailers: trailersField,
    advert_package_id,
    category,
    hull_material,
    hull_shape,
    keel_type,
    capacity,
    vessel_name,
    hin_number,
    registration,
    registry_number,
    port,
    boat_status,
    width,
    height,
    dead_rise,
    depth,
    displacement,
    economy,
    dry_weight,
    maximum_speed,
    cruising_speed,
  } = Object(advert);

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

  // useEffect(() => {
  //   if (isEditMode) {
  //     if (!Number(model?.name)) {
  //       setIsCustomModelSelected(true);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (isEditMode) {
      if (selectedCategory?.id == undefined) {
        dispatch({
          type: "SELECTED_CATEGORY",
          payload: { name: category?.name, id: category?.id },
        });
      }
    }
  }, [advert]);

  useEffect(() => {
    dispatch({ type: "REFRESH_STATE", payload: !refresh });
  }, []);

  // advert, isEditMode

  const fetchModalsByMake = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${
          isEditMode ? make?.name || make : values.make
        }&category_id=${isEditMode ? category?.id : selectedCategory?.id}`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      if (selectedCategory && make) {
        fetchModalsByMake();
      }
    } else {
      if (selectedCategory && values?.make) {
        fetchModalsByMake();
      }
    }
  }, [selectedCategory, make, values?.make]);

  let numberToSubtract = values?.advert_package > 4 ? 4 : 1;

  return (
    <BuildLayout
      heading="Item Description"
      otherContent={`Current Package: ${
        isEditMode
          ? advertPackages[+advert_package_id - numberToSubtract]
          : advertPackages[+values?.advert_package - numberToSubtract]
      }`}
    >
      <FormField
        FieldType="text"
        name="title"
        inputField={true}
        label="Title"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
        placeholder={"Title"}
        value={isEditMode ? title : values?.title}
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
            : handleInputChange(e, null, null, null, isEditMode, setFieldValue)
        }
      />
      <FormField
        FieldType="text"
        inputField={true}
        readOnly={
          isEditMode
            ? +advert_package_id - numberToSubtract < "2"
            : +values?.advert_package - numberToSubtract < "2"
        }
        name="sub_title"
        label="Subtitle"
        value={isEditMode ? sub_title : values?.sub_title}
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
            : handleInputChange(e, null, null, null, isEditMode, setFieldValue)
        }
        className={`border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full ${
          isEditMode
            ? +advert_package_id - numberToSubtract < "2"
              ? "pointer-events-none bg-gray-200"
              : "pointer-events-auto"
            : +values?.advert_package - numberToSubtract < "2"
            ? "pointer-events-none bg-gray-200"
            : "pointer-events-auto"
        }`}
        placeholder={"Sub Title"}
      />
      {/* {isEditMode ? (
        advert_package_id < "2" ? (
          <UpdateSubtitleNotice values={values} setFieldValue={setFieldValue} />
        ) : (
          ""
        )
      ) : */}
      {+values?.advert_package - numberToSubtract < "2" ? (
        <UpdateSubtitleNotice values={values} setFieldValue={setFieldValue} />
      ) : (
        ""
      )}

      <ContentToggle
        title={`${
          selectedCategory?.name || categoriesList[values?.advert?.category_id]
        } Details`}
        setShowContent={setShowDetails}
        textStyles="font-semibold text-[#11133D]"
        className="flex justify-between border-2 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
      />
      <div className={`${showDetails ? "block" : "hidden"}`}>
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
              name="make"
              label="Make"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Make"}
              value={isEditMode ? make?.name : values?.make}
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
              label="Make"
              name="make"
              addCustomOption={true}
              options={makes}
              value={isEditMode ? make?.name || make : values?.make}
              onChange={(e) => {
                isEditMode
                  ? handleInputChange(
                      e,
                      "make",
                      makes,
                      "advert",
                      isEditMode,
                      setFieldValue,
                      true
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
              name="model"
              label="Model"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Model"}
              value={isEditMode ? model?.name : values?.model}
              // value={modelValue}
              onChange={(e) => {
                isEditMode
                  ? handleInputChange(
                      e,
                      null,
                      null,
                      "advert",
                      isEditMode,
                      setFieldValue,
                      true
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
              addCustomOption={true}
              name="model"
              options={modals}
              value={isEditMode ? model?.name : values?.model}
              onChange={(e) => {
                isEditMode
                  ? handleInputChange(
                      e,
                      "model",
                      modals,
                      "advert",
                      isEditMode,
                      setFieldValue,
                      true
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

        <div className="flex sm:flex-row flex-col  gap-4">
          <CategorySelectDropdown
            label="Year"
            name="year"
            options={yearsArray}
            value={isEditMode ? year : values?.year}
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
          <CategorySelectDropdown
            label="Condition"
            name="condition"
            options={conditions}
            value={isEditMode ? condition?.id : values?.condition}
            onChange={(e) =>
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
                  )
            }
          />
        </div>
        {bigBoats.includes(
          selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
        ) ? (
          <>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Hull Shape"
                name="hull_shape"
                options={hullShapes}
                value={isEditMode ? hull_shape : values?.hull_shape}
                onChange={(e) =>
                  isEditMode
                    ? handleInputChange(
                        e,
                        "hull_shape",
                        hullShapes,
                        "advert",
                        isEditMode,
                        setFieldValue,
                        true
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
                label="Hull Material"
                name="hull_material"
                options={hullMaterialArray}
                value={isEditMode ? hull_material : values?.hull_material}
                onChange={(e) =>
                  isEditMode
                    ? handleInputChange(
                        e,
                        "hull_material",
                        hullMaterialArray,
                        "advert",
                        isEditMode,
                        setFieldValue,
                        true
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Keel Type"
                name="keel_type"
                options={keelTypeArray}
                value={isEditMode ? keel_type : values?.keel_type}
                onChange={(e) =>
                  isEditMode
                    ? handleInputChange(
                        e,
                        "keel_type",
                        keelTypeArray,
                        "advert",
                        isEditMode,
                        setFieldValue,
                        true
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
                name="capacity"
                label="Capacity (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Capacity"}
                value={isEditMode ? capacity : values?.capacity}
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="vessel_name"
                label="Vessel Name (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Vessel Name"}
                value={isEditMode ? vessel_name : values?.vessel_name}
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
                name="hin_number"
                label="HIN Number (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"HIN Number"}
                value={isEditMode ? hin_number : values?.hin_number}
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="registration"
                label="Registration (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Registration "}
                value={isEditMode ? registration : values?.registration}
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
                name="registry_number"
                label="Registry Number (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Registry Number"}
                value={isEditMode ? registry_number : values?.registry_number}
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
        ) : (
          ""
        )}

        {bigBoats.includes(
          selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
        ) ? (
          ""
        ) : (
          <div className="flex sm:flex-row flex-col gap-4">
            <CategorySelectDropdown
              label="Color"
              name="color"
              options={colors}
              value={isEditMode ? color : values?.color}
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
              label="Service History"
              name="service_history"
              options={serviceHistory}
              value={isEditMode ? service_history : values?.service_history}
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
        {bigBoats.includes(
          selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
        ) ? (
          ""
        ) : (
          <div className="flex sm:flex-row flex-col  gap-4">
            <CategorySelectDropdown
              label="Type"
              name="type"
              options={types}
              value={isEditMode ? type?.id : values?.type?.id}
              onChange={(e) =>
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
                    )
              }
            />
            <FormField
              FieldType="text"
              inputField={true}
              name="length"
              label="Length (FT)"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Length (FT)"}
              value={isEditMode ? length : values?.length}
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
        {bigBoats.includes(
          selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
        ) ? (
          ""
        ) : (
          <div className="flex sm:flex-row flex-col  gap-4">
            <FormField
              FieldType="text"
              inputField={true}
              name="hours"
              label="Hours (HRS)"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Hours (HRS)"}
              value={isEditMode ? hours : values?.hours}
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
              label="Trailers"
              name="trailers"
              options={trailers}
              value={isEditMode ? trailersField : values?.trailers}
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
        {bigBoats.includes(
          selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
        ) ? (
          <>
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="port"
                label="Port/Marina"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Port/Marina"}
                value={isEditMode ? port : values?.port}
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
                label="Boat Status"
                name="boat_status"
                options={status}
                value={isEditMode ? boat_status : values?.boat_status}
                onChange={(e) =>
                  isEditMode
                    ? handleInputChange(
                        e,
                        "boat_status",
                        status,
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
            <CategorySelectDropdown
              label="Type"
              name="type"
              options={types}
              value={isEditMode ? type?.id : values?.type?.id}
              onChange={(e) =>
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
                    )
              }
            />
          </>
        ) : (
          ""
        )}
      </div>
      {bigBoats.includes(
        selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
      ) ? (
        <>
          <ContentToggle
            title={`${selectedCategory?.name} Dimensions`}
            setShowContent={setShowDimensions}
            textStyles="font-semibold text-[#11133D]"
            className="flex justify-between border-2 mt-6 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
          />
          <div className={`${showDimensions ? "block" : "hidden"}`}>
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="length"
                label="Length (LOA)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Overall Length (FT)`}
                value={isEditMode ? length : values?.length}
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
                name="width"
                label="Width (Beam)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Overall Width (FT)`}
                value={isEditMode ? width : values?.width}
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="height"
                label="Height (Air Draft)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Water level to Highest Point (FT)"}
                value={isEditMode ? height : values?.height}
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
                name="depth"
                label="Depth (Draft)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Water level to Bottom (FT)"}
                value={isEditMode ? depth : values?.depth}
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="displacement"
                label="Displacement (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                useLabelAsPlaceHolder={false}
                placeholder={"Weight Loaded (Kg)"}
                value={isEditMode ? displacement : values?.displacement}
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
                name="dead_rise"
                label="Deadrise (At Transom) (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                useLabelAsPlaceHolder={false}
                placeholder={"Hull Angle vs Waterline (DEG)"}
                value={isEditMode ? dead_rise : values?.dead_rise}
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
            <div>
              <FormField
                FieldType="text"
                inputField={true}
                name="dry_weight"
                label="Dry Weight (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                useLabelAsPlaceHolder={false}
                placeholder={"Weight Empty (KG)"}
                value={isEditMode ? dry_weight : values?.dry_weight}
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
        </>
      ) : (
        ""
      )}
      {bigBoats.includes(
        selectedCategory?.name?.toLowerCase().replace(/\s+/g, "-")
      ) ? (
        <>
          <ContentToggle
            title={`${selectedCategory?.name} Performance`}
            setShowContent={setShowPerformance}
            textStyles="font-semibold text-[#11133D]"
            className="flex justify-between border-2 mt-6 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
          />
          <div className={`${showPerformance ? "block" : "hidden"}`}>
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="cruising_speed"
                label="Crusing Speed (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Knots Per Hour (KPH)`}
                value={isEditMode ? cruising_speed : values?.cruising_speed}
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
                name="maximum_speed"
                label="Maximum Speed (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Knots Per Hour (KPH)`}
                value={isEditMode ? maximum_speed : values?.maximum_speed}
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
            <div className="flex sm:flex-row flex-col  gap-4">
              <FormField
                FieldType="text"
                inputField={true}
                name="economy"
                label="Economy (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Gallons Used On Average (LPH)"}
                value={isEditMode ? economy : values?.economy}
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
        </>
      ) : (
        ""
      )}
    </BuildLayout>
  );
};

export default ItemDescriptionStep2;
