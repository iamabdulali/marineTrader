import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressSteps = ({ totalSteps, currentStep, stepLabels, className }) => {
  return (
    <div className={`flex md:justify-center text-center ${className}`}>
      {[...Array(totalSteps).keys()].map((progress) => (
        <React.Fragment key={progress + 1}>
          {progress > 0 && (
            <>
              <div
                className={` h-1 w-full md:block hidden rounded-sm relative top-5 bar${
                  progress + 1
                } ${
                  progress + 1 <= currentStep
                    ? "bg-[#0D1A8B]"
                    : "bg-[#8891B2] bg-opacity-20"
                }`}
              />
            </>
          )}

          <div className="md:flex hidden flex-col items-center gap-4 font-semibold ">
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
      <div className="flex items-center gap-5 md:hidden">
        <CircularProgressbar
          strokeWidth={5}
          styles={buildStyles({
            pathColor: `#0D1A8B`,
            textColor: "#0D1A8B",
            trailColor: "#D4DDFC",
            textSize: "1.3rem",
          })}
          value={(currentStep / totalSteps) * 100}
          text={`${currentStep} / ${totalSteps}`}
          className="w-20 h-20"
        />
        <div className="text-left min-w-52">
          <p className="text-[#8891B2]">Step {currentStep}</p>
          <p className="text-[#0D1A8B] font-semibold text-lg">
            {stepLabels[currentStep - 1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
