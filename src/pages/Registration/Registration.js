import React, { useState } from "react";
import { Link } from "react-router-dom";

import PrivateSVG from "../../assets/private.svg";
import TradeSVG from "../../assets/tradeseller.svg";
import { logo } from "../../assets";

const Registration = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <img
        src={logo}
        alt="logo"
        className="sm:w-36 w-24 block sm:m-6 sm:mb-0 mx-auto my-6"
      />
      <div className="flex sm:min-h-[85vh] justify-center xl:justify-normal xl:items-center">
        {/* Left side (Registration options) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center xl:items-baseline items-center ">
          <div className="sm:mb-16 mb-8 mx-[4.5em]">
            <p className="sm:text-2xl text-xl font-bold mb-2 sm:text-left text-center">
              Registration
            </p>
            <p className="sm:text-lg text-base">Choose a seller type</p>
          </div>
          <div className="flex sm:flex-row flex-col gap-6 justify-center ">
            <Link
              to="/private-seller"
              className="text-decoration-none color-inherit border-2 rounded-xl text-center font-semibold py-10 px-16"
            >
              <div
                className={`option flex flex-col items-center ${
                  selectedOption === "private" ? "selected" : ""
                } border-blue-500 p-6 rounded`}
                onClick={() => handleOptionClick("private")}
              >
                <img
                  src={PrivateSVG}
                  alt="Private"
                  className="w-12 h-12 mb-4"
                />
                Private
              </div>
            </Link>

            <Link
              to="/trade-seller"
              className="text-decoration-none color-inherit border-2 rounded-xl text-center font-semibold  py-10 px-16"
            >
              <div
                className={`option flex flex-col items-center ${
                  selectedOption === "trade" ? "selected" : ""
                } border-blue-500 p-6 rounded`}
                onClick={() => handleOptionClick("trade")}
              >
                <img src={TradeSVG} alt="Trade" className="w-12 h-12 mb-4" />
                Trade
              </div>
            </Link>
          </div>
          <Link
            to="/login"
            className="mt-10 text-sm text-center text-[#0D1A8B] font-semibold underline"
          >
            Already a member?
          </Link>
        </div>

        {/* Right side (Image) */}
        <div className="hidden xl:block w-1/2 fixed right-0 top-0">
          {/* Replace the image URL with your desired image */}
          <img
            src={require("../../assets/ship.png")}
            alt="Ship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
