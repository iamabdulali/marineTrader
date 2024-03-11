import React, { useContext } from "react";
import BuildLayout from "./BuildLayout";
import CustomDropdownMenu from "../CustomDropdownMenu";
import ModificationMenu from "./AdComponents/ModificationMenu";
import { AuthContext } from "../../Context/AuthContext";

const ItemFeaturesStep3 = () => {
  const {
    modificationCheckboxes,
    featuresCheckboxes,
    accessoriesCheckboxes,
    convenienceCheckboxes,
    dispatch,
  } = useContext(AuthContext);

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
              children={
                <ModificationMenu
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
                    Select Features
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
                    Select Conveniences
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
                    Select Accessories
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
                />
              }
            />
          </div>
        </div>
      </BuildLayout>
    </>
  );
};

export default ItemFeaturesStep3;
