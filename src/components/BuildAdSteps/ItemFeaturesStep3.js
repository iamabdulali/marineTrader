import React from "react";
import BuildLayout from "./BuildLayout";
import { CategorySelectDropdown } from "../CategorySelectDropdown";

const ItemFeaturesStep3 = () => {
  return (
    <>
      <BuildLayout heading="Items Features">
        <div className="flex gap-4">
          <CategorySelectDropdown
            // multiple
            label="Modification"
            name="modification"
            options={["Modification1", "Modification2", "Modification3"]}
          />
          <CategorySelectDropdown
            label="Feature"
            name="feature"
            options={["Feature1", "Feature2", "Feature3"]}
          />
        </div>

        <div className="flex gap-4">
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
