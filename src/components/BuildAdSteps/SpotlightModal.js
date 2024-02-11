import React, { useState } from "react";
import Step1 from "./SpotlightModalSteps/Step1";

const SpotlightModal = ({ onClick, setFieldValue, values }) => {
  const [showSpotlightSelection, setShowSpotlightSelection] = useState(false);

  return (
    <>
      <Step1
        values={values}
        setFieldValue={setFieldValue}
        showSpotlightSelection={showSpotlightSelection}
      />
      <div className="text-right pr-8 py-8">
        <button
          type="button"
          onClick={onClick}
          className="bg-[#8891B2] text-white py-3 px-7 mr-5 rounded-md min-w-[120px]"
        >
          Close
        </button>
        {showSpotlightSelection ? (
          <button
            type="button"
            onClick={() => setShowSpotlightSelection(false)}
            className="bg-[#8891B2] text-white py-3 px-7 mr-5 rounded-md min-w-[120px]"
          >
            Add More
          </button>
        ) : (
          ""
        )}
        <button
          onClick={() => setShowSpotlightSelection(true)}
          type="button"
          className="bg-[#0D1A8B] text-white py-3 px-7  rounded-md min-w-[120px]"
        >
          {showSpotlightSelection ? "Confirm" : "Next"}
        </button>
      </div>
    </>
  );
};

export default SpotlightModal;
