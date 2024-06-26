import React, { useState } from "react";
import Step1 from "./SpotlightModalSteps/Step1";

const SpotlightModal = ({
  onClick,
  setFieldValue,
  values,
  spotlightFor,
  isEditMode,
}) => {
  const [showSpotlightSelection, setShowSpotlightSelection] = useState(false);

  return (
    <>
      <Step1
        isEditMode={isEditMode}
        spotlightFor={spotlightFor}
        values={values}
        setFieldValue={setFieldValue}
        showSpotlightSelection={showSpotlightSelection}
      />
      <div className="text-right sm:pl-0 pl-4 sm:pr-8 pr-4 py-8 flex justify-end sm:flex-row flex-col gap-5">
        <button
          type="button"
          onClick={onClick}
          className="bg-[#8891B2] hover:bg-[#a3aac4] text-white py-3 px-7  rounded-md min-w-[120px]"
        >
          Close
        </button>
        {showSpotlightSelection ? (
          <button
            type="button"
            onClick={() => setShowSpotlightSelection(false)}
            className="bg-[#8891B2] hover:bg-[#a3aac4] text-white py-3 px-7  rounded-md min-w-[120px]"
          >
            Add More
          </button>
        ) : (
          ""
        )}
        <button
          onClick={
            showSpotlightSelection
              ? onClick
              : () => setShowSpotlightSelection(true)
          }
          type="button"
          className="bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white py-3 px-7  rounded-md min-w-[120px]"
        >
          {showSpotlightSelection ? "Confirm" : "Next"}
        </button>
      </div>
    </>
  );
};

export default SpotlightModal;
