import React, { useContext } from "react";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { FormField } from "../FormField";
import UpdateSubtitleNotice from "../UpdateSubtitleNotice";
import BuildLayout from "./BuildLayout";
import { AuthContext } from "../../Context/AuthContext";
import { years } from "../../utils/DummyData";

const ItemDescriptionStep2 = () => {
  const { selectedPackage } = useContext(AuthContext);
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
        name="sub_title"
        label="Subtitle"
        className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
      />
      {selectedPackage == "Standard" ? <UpdateSubtitleNotice /> : ""}

      <div className="flex sm:flex-row flex-col gap-4">
        <CategorySelectDropdown
          label="Make"
          name="make"
          options={[
            "Yamaha",
            "Tiger Shark",
            "Seadoo",
            "Polaris",
            "Kawasaki",
            "Huson",
            "Honda",
            "Benelli",
            "Nitro",
          ]}
        />
        <CategorySelectDropdown
          label="Model"
          name="model"
          options={["Model1", "Model2", "Model3"]}
        />
      </div>

      <div className="flex sm:flex-row flex-col  gap-4">
        <CategorySelectDropdown label="Year" name="year" options={years} />
        <CategorySelectDropdown
          label="Condition"
          name="condition"
          options={[
            "New",
            "Like New",
            "Excellent",
            "Good",
            "Average",
            "Worn",
            "Spares or Repairs",
          ]}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <CategorySelectDropdown
          label="Color"
          name="color"
          options={[
            "Black",
            "Blue",
            "Red",
            "Yellow",
            "Orange",
            "Grey",
            "Purple",
            "White",
            "Cream",
            "Brown",
            "Green",
            "Pink",
            "Silver",
            "Gold",
          ]}
        />
        <CategorySelectDropdown
          label="Service History"
          name="service_history"
          options={["None", "Part", "Full", "Month", "Repaired"]}
        />
      </div>
      <div className="flex sm:flex-row flex-col  gap-4">
        <CategorySelectDropdown
          label="Passenger"
          name="passenger"
          options={["Passenger1", "Passenger2", "Passenger3"]}
        />
        <FormField
          FieldType="number"
          inputField={true}
          name="length"
          label="Length (FT)"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
        />
      </div>
      <div className="flex sm:flex-row flex-col  gap-4">
        <FormField
          FieldType="number"
          inputField={true}
          name="hours"
          label="Hours (HRS)"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
        />
        <CategorySelectDropdown
          label="Trailers"
          name="trailers"
          options={["Yes", "No", "Sold Separately"]}
        />
      </div>
    </BuildLayout>
  );
};

export default ItemDescriptionStep2;
