import React from "react";

const ProgressSteps = ({ totalSteps, currentStep, stepLabels, className }) => {
  return (
    <div className={`flex justify-center text-center ${className}`}>
      {[...Array(totalSteps).keys()].map((progress) => (
        <React.Fragment key={progress + 1}>
          {progress > 0 && (
            <div
              className={` h-1 w-full rounded-sm relative top-5 bar${
                progress + 1
              } ${
                progress + 1 <= currentStep
                  ? "bg-[#0D1A8B]"
                  : "bg-[#8891B2] bg-opacity-20"
              }`}
            />
          )}
          <div className="flex flex-col items-center gap-4 font-semibold ">
            <div
              className={` ${
                progress + 1 <= currentStep
                  ? "text-[#0D1A8B] border-[#0D1A8B]"
                  : "text-[#8891B2] border-[#8891B2]"
              } font-semibold w-12 h-12 flex justify-center items-center rounded-full border-2 `}
            >
              {progress + 1}
            </div>
            <p
              className={`${
                progress + 1 <= currentStep
                  ? "text-[#0D1A8B]"
                  : "text-[#8891B2]"
              } text-xs w-28 `}
            >
              {stepLabels[progress]}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
