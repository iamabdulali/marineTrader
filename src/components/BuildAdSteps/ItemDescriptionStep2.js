import React from "react";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { FormField } from "../FormField";
import UpdateSubtitleNotice from "../UpdateSubtitleNotice";
import BuildLayout from "./BuildLayout";

const ItemDescriptionStep2 = () => {
  return (
    <BuildLayout heading="Item Description">
      <FormField
        FieldType="text"
        name="title"
        inputField={true}
        label="Title"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
      />
      <FormField
        FieldType="text"
        inputField={true}
        name="subtitle"
        label="Subtitle"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
      />
      <UpdateSubtitleNotice />
      <div className="flex gap-4">
        <CategorySelectDropdown
          label="Make"
          name="make"
          options={["Make1", "Make2", "Make3"]}
        />
        <CategorySelectDropdown
          label="Model"
          name="model"
          options={["Model1", "Model2", "Model3"]}
        />
      </div>

      <div className="flex gap-4">
        <CategorySelectDropdown
          label="Year"
          name="year"
          options={["Year1", "Year2", "Year3"]}
        />
        <CategorySelectDropdown
          label="Condition"
          name="condition"
          options={["Condition1", "Condition2", "Condition3"]}
        />
      </div>
      <div className="flex gap-4">
        <CategorySelectDropdown
          label="Color"
          name="color"
          options={["Color1", "Color2", "Color3"]}
        />
        <CategorySelectDropdown
          label="Service History"
          name="serviceHistory"
          options={["Service1", "Service2", "Service3"]}
        />
      </div>
      <div className="flex gap-4">
        <CategorySelectDropdown
          label="Passenger"
          name="passenger"
          options={["Passenger1", "Passenger2", "Passenger3"]}
        />
        <CategorySelectDropdown
          label="Length"
          name="length"
          options={["Length1", "Length2", "Length3"]}
        />
      </div>
      <div className="flex gap-4">
        <CategorySelectDropdown
          label="Hours"
          name="hours"
          options={["Hours1", "Hours2", "Hours3"]}
        />
        <CategorySelectDropdown
          label="Trailers"
          name="trailers"
          options={["Trailers", "Trailers2", "Trailers3"]}
        />
      </div>
    </BuildLayout>
  );
};

export default ItemDescriptionStep2;
