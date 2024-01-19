import React, { useState } from "react";
import TradeSellerCompanyInfoForm from "../../../components/Forms/TradeSellerCompanyInfoForm"; // Import your actual component here
import Ship from "../../../assets/ship.png";
import TradeSellerServiceHoursForm from "../../../components/Forms/TradeSellerServiceHoursForm";
import TradeSellerFacilitiesForm from "../../../components/Forms/TradeSellerFacilitiesForm";
import { logo } from "../../../assets";
import PrivateSellerSignUpForm from "../../../components/Forms/PrivateSellerSignUpForm";
import { useNavigate } from "react-router-dom";

export default function PrivateSeller() {
  const [currentStep, setCurrentStep] = useState(1);
  const circleSize = "50px";
  const barHeight = "5px";
  const navigate = useNavigate();





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
            <h1 className="capitalize font-bold text-[#11133D] sm:ml-8 mt-10 ml-3">
          Sign up as a private seller
        </h1>
            <PrivateSellerSignUpForm/>
          </div>
        );
      
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
        {/* <h1 className="capitalize font-bold text-[#11133D] sm:ml-8 mt-10 ml-3">
          Sign up as a private seller
        </h1> */}

        {/* Progress Indicator */}
        
        {/* Form Content */}
        {renderStepContent()}

        {/* Buttons */}
    
      </div>

      {/* Right side (Image) */}
      <div className="w-5/12 xl:static fixed right-0 lg:block hidden">
        {/* Replace the image URL with your desired image */}
        <img className="xl:h-auto min-h-screen" src={Ship} alt="Ship" />
      </div>
    </div>
  );
}
