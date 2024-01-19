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
    <div className="flex h-screen">
      {/* Left side (Registration options) */}
      <img src={logo} alt="logo" className="absolute w-36 block m-6" />
      <div className="w-full lg:w-1/2 flex flex-col justify-center ">
        <div className="mb-16 mx-[4.5em]">
          <p className="text-2xl font-bold mb-2">Registration</p>
          <p className="text-lg">Choose a seller type</p>
        </div>
        <div className="flex flex-row gap-6 justify-center">
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
              <img src={PrivateSVG} alt="Private" className="w-12 h-12 mb-4" />
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
        <Link className="mt-10 text-sm text-center text-[#0D1A8B] font-semibold underline">
          Already a member?
        </Link>
      </div>

      {/* Right side (Image) */}
      <div className="hidden lg:block w-1/2">
        {/* Replace the image URL with your desired image */}
        <img
          src={require("../../assets/ship.png")}
          alt="Ship"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
