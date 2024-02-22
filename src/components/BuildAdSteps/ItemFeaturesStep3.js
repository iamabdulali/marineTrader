import React from "react";
import BuildLayout from "./BuildLayout";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import CustomDropdownMenu from "../CustomDropdownMenu";
import ModificationMenu from "./AdComponents/ModificationMenu";

const ItemFeaturesStep3 = () => {
  return (
    <>
      <BuildLayout heading="Items Features">
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
                    Select Modifications
                  </p>
                </>
              }
              children={<ModificationMenu />}
            />
          </div>
          <CategorySelectDropdown
            label="Feature"
            name="feature"
            options={["Feature1", "Feature2", "Feature3"]}
          />
        </div>

        <div className="flex sm:flex-row flex-col  gap-4">
          <CategorySelectDropdown
            label="Convenience"
            name="convenience"
            options={["Convenience1", "Convenience2", "Convenience3"]}
          />
          <CategorySelectDropdown
            label="Accessories"
            name="accessories"
            options={["Accessories1", "Accessories2", "Accessories3"]}
          />
        </div>
      </BuildLayout>
    </>
  );
};

export default ItemFeaturesStep3;
