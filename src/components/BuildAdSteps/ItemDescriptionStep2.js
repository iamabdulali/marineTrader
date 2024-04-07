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
  passengers,
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
  const { selectedPackage, selectedCategory, conditions, makes, types } =
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
    passenger,
    year,
    length,
    trailers: trailersField,
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

  useEffect(() => {
    if (isEditMode) {
      if (!Number(model?.name)) {
        setIsCustomModelSelected(true);
      }
    }
  }, []);

  const fetchModalsByMake = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/models?make=${values.make}&category_id=${selectedCategory?.id}`
      );
      setModals(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModalsByMake();
  }, [values?.make]);

  return (
    <BuildLayout
      heading="Item Description"
      otherContent={`Current Package: ${
        advertPackages[values?.advert_package]
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

      {/* <UpdateSubtitleNotice values={values} setFieldValue={setFieldValue} /> */}
      {console.log(values?.advert_package)}
      {values?.advert_package < "2" ? (
        <UpdateSubtitleNotice values={values} setFieldValue={setFieldValue} />
      ) : (
        <FormField
          FieldType="text"
          inputField={true}
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
              : handleInputChange(
                  e,
                  null,
                  null,
                  null,
                  isEditMode,
                  setFieldValue
                )
          }
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
          placeholder={"Sub Title"}
        />
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
          {isCustomModelSelected && isCustomMakeSelected ? (
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
              value={isEditMode ? make?.id : values?.make}
              label="Make"
              name="make"
              addCustomOption={true}
              options={makes}
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
              addCustomOption={true}
              name="model"
              options={modals}
              value={isEditMode ? model?.id : values?.model}
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

        <div className="flex sm:flex-row flex-col  gap-4">
          <CategorySelectDropdown
            label="Year"
            name="year"
            options={yearsArray}
            value={isEditMode ? year : values?.year}
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
        {bigBoats.includes(selectedCategory?.name) ? (
          <>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Hull Shape"
                name="hull_shape"
                options={hullShapes}
              />
              <CategorySelectDropdown
                label="Hull Material"
                name="hull_material"
                options={hullMaterialArray}
              />
            </div>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Keel Type"
                name="keel_type"
                options={keelTypeArray}
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="capacity"
                label="Capacity (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Capacity"}
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
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="hin_number"
                label="HIN Number (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"HIN Number"}
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
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="registry_number"
                label="Registry Number (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Registry Number"}
              />
            </div>
          </>
        ) : (
          ""
        )}

        {bigBoats.includes(selectedCategory?.name) ? (
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
        {bigBoats.includes(selectedCategory?.name) ? (
          ""
        ) : (
          <div className="flex sm:flex-row flex-col  gap-4">
            <CategorySelectDropdown
              label="Passenger"
              name="passenger"
              options={passengers}
              value={isEditMode ? passenger : values?.passenger}
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
        {bigBoats.includes(selectedCategory?.name) ? (
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
        {bigBoats.includes(selectedCategory?.name) ? (
          <div className="flex sm:flex-row flex-col  gap-4">
            <FormField
              FieldType="text"
              inputField={true}
              name="port"
              label="Port/Marina"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Port/Marina"}
            />
            <CategorySelectDropdown
              label="Boat Status"
              name="status"
              options={status}
            />
          </div>
        ) : (
          ""
        )}
        <div>
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
        </div>
      </div>
      {bigBoats.includes(selectedCategory?.name) ? (
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
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="width"
                label="Width (Beam)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Overall Width (FT)`}
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
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="depth"
                label="Depth (Draft)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={"Water level to Bottom (FT)"}
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
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="deadrise"
                label="Deadrise (At Transom) (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                useLabelAsPlaceHolder={false}
                placeholder={"Hull Angle vs Waterline (DEG)"}
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
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {bigBoats.includes(selectedCategory?.name) ? (
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
                name="crusing_speed"
                label="Crusing Speed (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Knots Per Hour (KPH)`}
              />
              <FormField
                FieldType="text"
                inputField={true}
                name="maximum_speed"
                label="Maximum Speed (Optional)"
                className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
                placeholder={`Knots Per Hour (KPH)`}
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
