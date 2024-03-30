import React, { useContext } from "react";
import { CategorySelectDropdown } from "../../CategorySelectDropdown";
import { AuthContext } from "../../../Context/AuthContext";
import { yearsArray } from "../../../utils/DummyData";
import { FormField } from "../../FormField";

const MachinaryForm = ({ formFor }) => {
  const { makes, modals } = useContext(AuthContext);

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-4">
        <CategorySelectDropdown
          label="Make"
          name={`${formFor}.make`}
          options={makes}
        />
        <CategorySelectDropdown
          label="Model"
          name={`${formFor}.modal`}
          options={modals}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-4">
        <FormField
          FieldType="text"
          inputField={true}
          name={`${formFor}.power`}
          label="Power"
          className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
          placeholder={"Power (HP)"}
        />
        <CategorySelectDropdown
          label="Year"
          name={`${formFor}.year`}
          options={yearsArray}
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
          />
          <FormField
            FieldType="text"
            inputField={true}
            name={`${formFor}.hours`}
            label="Hours"
            className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            placeholder={"Hours (HRS)"}
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
        />
      </div>
    </>
  );
};

export default MachinaryForm;
