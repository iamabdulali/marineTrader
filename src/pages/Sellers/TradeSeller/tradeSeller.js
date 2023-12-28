import React, { useState } from "react";
import TradeSellerCompanyInfoForm from "../../../components/Forms/TradeSellerCompanyInfoForm"; // Import your actual component here
import Ship from "../../../assets/ship.png";
import TradeSellerServiceHoursForm from "../../../components/Forms/TradeSellerServiceHoursForm";
import TradeSellerFacilitiesForm from "../../../components/Forms/TradeSellerFacilitiesForm";
import { logo } from "../../../assets";

export default function TradeSeller() {
  const [currentStep, setCurrentStep] = useState(1);
  const circleSize = "50px";
  const barHeight = "5px";

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getTitleStyle = (step) => {
    return {
      color: step <= currentStep ? "#0D1A8B" : "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0",
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="sm:mx-8 mx-3 text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
              <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
              Company Info
            </h2>
            <TradeSellerCompanyInfoForm />
          </div>
        );
      case 2:
        return <TradeSellerServiceHoursForm />;
      case 3:
        return <TradeSellerFacilitiesForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Left side (Form) */}
      <div className="lg:w-7/12 p-4 w-full">
        {/* Title */}
        <img className="w-32 sm:mx-0 mx-auto" src={logo} alt="logo" />
        <h1 className="capitalize font-bold text-[#11133D] sm:ml-8 mt-10 ml-3">
          Sign up as a trade seller
        </h1>

        {/* Progress Indicator */}
        <div className="flex justify-center  text-center mt-10 sm:w-8/12 w-11/12 mx-auto">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 && (
                <div
                  className={`bg-[#0D1A8B] h-1 w-full rounded-sm relative top-5 bar${step}`}
                />
              )}
              <div className="flex flex-col items-center gap-4 text-[#0D1A8B] font-semibold ">
                <div className="text-[#0D1A8B] font-semibold w-12 h-12 flex justify-center items-center rounded-full border-2 border-[#0D1A8B]">
                  {step}
                </div>
                <div>
                  {step === 1 && "Service Hours"}
                  {step === 2 && "Company Info"}
                  {step === 3 && "Facilities"}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Form Content */}
        {renderStepContent()}

        {/* Buttons */}
        <div className="text-right mr-8 mt-10">
          {currentStep > 1 && (
            <button
              className="bg-[#8891B2] text-white p-3 rounded-md w-28 mr-5"
              onClick={handlePrevStep}
            >
              Back
            </button>
          )}
          <button
            className="bg-[#0D1A8B] text-white p-3 rounded-md w-28"
            onClick={handleNextStep}
          >
            {currentStep < 3 ? "Next" : "Submit"}
          </button>
        </div>
      </div>

      {/* Right side (Image) */}
      <div className="w-5/12 xl:static fixed right-0 lg:block hidden">
        {/* Replace the image URL with your desired image */}
        <img className="xl:h-auto min-h-screen" src={Ship} alt="Ship" />
      </div>
    </div>
  );
}
