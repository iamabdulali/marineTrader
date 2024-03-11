import React, { useContext, useEffect, useState } from "react";
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
import { fetchOptions } from "../../utils/fetchOptions";

const ItemDescriptionStep2 = () => {
  const { selectedPackage } = useContext(AuthContext);
  const [modals, setModals] = useState([]);
  const [make, setMake] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchOptions("models", setModals);
    fetchOptions("make", setMake);
    fetchOptions("conditions", setConditions);
    fetchOptions("types", setTypes);
  }, []);

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
        <CategorySelectDropdown label="Make" name="make" options={make} />
        <CategorySelectDropdown label="Model" name="model" options={modals} />
      </div>

      <div className="flex sm:flex-row flex-col  gap-4">
        <CategorySelectDropdown label="Year" name="year" options={yearsArray} />
        <CategorySelectDropdown
          label="Condition"
          name="condition"
          options={conditions}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <CategorySelectDropdown label="Color" name="color" options={colors} />
        <CategorySelectDropdown
          label="Service History"
          name="service_history"
          options={serviceHistory}
        />
      </div>
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
          options={trailers}
        />
      </div>
      <div>
        <CategorySelectDropdown label="Type" name="type" options={types} />
      </div>
    </BuildLayout>
  );
};

export default ItemDescriptionStep2;
