import React, { useContext, useState } from "react";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { FormField } from "../FormField";
import UpdateSubtitleNotice from "../UpdateSubtitleNotice";
import BuildLayout from "./BuildLayout";
import { AuthContext } from "../../Context/AuthContext";
import {
  colors,
  passengers,
  serviceHistory,
  trailers,
  yearsArray,
} from "../../utils/DummyData";
import ContentToggle from "../ItemDetailsPage/ToggleContent";
import { bigBoats } from "../..";
import { useFormikContext } from "formik";

const ItemDescriptionStep2 = () => {
  const {
    selectedPackage,
    selectedCategory,
    conditions,
    makes,
    types,
    modals,
  } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showPerformance, setShowPerformance] = useState(true);

  const { values, setFieldValue } = useFormikContext();

  return (
    <BuildLayout heading="Item Description">
      <FormField
        FieldType="text"
        name="title"
        inputField={true}
        label="Title"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
        placeholder={"Title"}
      />
      <FormField
        FieldType="text"
        inputField={true}
        name="sub_title"
        label="Subtitle"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
        placeholder={"Sub Title"}
      />
      {values?.advert_package == "1" ? (
        <UpdateSubtitleNotice values={values} setFieldValue={setFieldValue} />
      ) : (
        ""
      )}

      <ContentToggle
        title={`${selectedCategory?.name} Details`}
        setShowContent={setShowDetails}
        textStyles="font-semibold text-[#11133D]"
        className="flex justify-between border-2 cursor-pointer items-center mb-6 bg-[#f6f6f6] p-3"
      />
      <div className={`${showDetails ? "block" : "hidden"}`}>
        <div className="flex sm:flex-row flex-col gap-4">
          <CategorySelectDropdown label="Make" name="make" options={makes} />
          <CategorySelectDropdown label="Model" name="model" options={modals} />
        </div>

        <div className="flex sm:flex-row flex-col  gap-4">
          <CategorySelectDropdown
            label="Year"
            name="year"
            options={yearsArray}
          />
          <CategorySelectDropdown
            label="Condition"
            name="condition"
            options={conditions}
          />
        </div>
        {bigBoats.includes(selectedCategory?.name) ? (
          <>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Hull Shape"
                name="hull_shape"
                options={yearsArray}
              />
              <CategorySelectDropdown
                label="Hull Material"
                name="hull_material"
                options={conditions}
              />
            </div>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Keel Type"
                name="keel_type"
                options={yearsArray}
              />
              <CategorySelectDropdown
                label="Capacity (Optional)"
                name="capacity"
                options={conditions}
              />
            </div>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Vessel Name (Optional)"
                name="vessel_name"
                options={yearsArray}
              />
              <CategorySelectDropdown
                label="HIN Number (Optional)"
                name="hin_number"
                options={conditions}
              />
            </div>
            <div className="flex sm:flex-row flex-col  gap-4">
              <CategorySelectDropdown
                label="Registration (Optional)"
                name="registration"
                options={yearsArray}
              />
              <CategorySelectDropdown
                label="Registry Number (Optional)"
                name="registry_number"
                options={conditions}
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
            />
            <CategorySelectDropdown
              label="Service History"
              name="service_history"
              options={serviceHistory}
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
            />
            <FormField
              FieldType="number"
              inputField={true}
              name="length"
              label="Length (FT)"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Length (FT)"}
            />
          </div>
        )}
        {bigBoats.includes(selectedCategory?.name) ? (
          ""
        ) : (
          <div className="flex sm:flex-row flex-col  gap-4">
            <FormField
              FieldType="number"
              inputField={true}
              name="hours"
              label="Hours (HRS)"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              placeholder={"Hours (HRS)"}
            />
            <CategorySelectDropdown
              label="Trailers"
              name="trailers"
              options={trailers}
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
              label="Vessel Type"
              name="vessel_type"
              options={trailers}
            />
          </div>
        ) : (
          ""
        )}
        <div>
          <CategorySelectDropdown label="Type" name="type" options={types} />
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
