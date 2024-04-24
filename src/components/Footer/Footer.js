import React, { useState } from "react";
import { flagUsa, whiteLogo } from "../../assets";
import { Link } from "react-router-dom";
import { FaChevronDown, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  return (
    <footer className="bg-[#11133D] text-white mt-28">
      <div className="smallLg:px-24 px-5 mx-auto flex lg:flex-row flex-col smallLg:py-20 py-10 gap-4 justify-between">
        {/* Column 1 */}
        <div className="w-full lg:w-1/4 mb-4 sm:mb-0 text-left">
          <img src={whiteLogo} alt="Logo" className="mb-4 w-32" />
          <p className="text-sm leading-loose">
            MarineTrader is a website designed for boat sellers to list and
            promote their boat quickly, easily and in order to achieve the best
            exposure and price possible.
          </p>
        </div>

        {/* Column 2 */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/12 mb-4 sm:mb-0">
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="list-none">
            <li>
              <Link>Home</Link>
            </li>
            <li className="mt-4">
              <Link>About</Link>
            </li>
            <li className="mt-4">
              <Link>Service</Link>
            </li>
            <li className="mt-4">
              <Link>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/12 mb-4 sm:mb-0">
          <h4 className="text-lg font-semibold mb-6">Useful Links</h4>
          <ul className="list-none">
            <li>
              <Link>Watercraft</Link>
            </li>
            <li className="mt-4">
              <Link>Directory</Link>
            </li>
            <li className="mt-4">
              <Link>Events</Link>
            </li>
            <li className="mt-4">
              <Link>News</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="w-full lg:w-1/3 lg:mt-0 mt-2">
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <div className="flex items-center relative mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 border bg-transparent py-5 border-[#8891B2] rounded-lg focus:outline-none focus:shadow-outline"
            />
            <button className="bg-[#fff] right-3 rounded-md font-semibold absolute text-[#11133D] px-6 py-2 rounded-r">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:items-center justify-between smallLg:px-24 px-5 py-7 border-t-[1px] border-white">
        <p className="md:order-[0] order-1">© 2023 Copyright Marine Trader</p>
        <div className="flex items-center gap-5 md:justify-normal justify-between md:mb-0 mb-7">
          <div className="flex md:flex-row  gap-3">
            <Link>Privacy</Link>
            <Link>Terms Of Services</Link>
          </div>
          <div className="relative inline-block mr-7">
            {/* <div className="flex items-center gap-7 ">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaGlobe size={20} color="#fff" />
                <FaChevronDown size={12} color="#696E9D" />
              </button>
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img src={flagUsa} className="w-6" />
                <FaChevronDown size={12} color="#696E9D" />
              </button>
            </div> */}

            {/* {languageDropdownOpen && (
              <div className="absolute w-max mt-2 -top-28 -left-20 bg-white text-black border rounded shadow-lg">
                <button className="py-2 px-3 flex items-center">
                  {" "}
                  <img src={flagUsa} className="w-6 mr-3" />
                  English
                </button>
                <button className="py-2 px-3 flex items-center">
                  {" "}
                  <img src={flagUsa} className="w-6 mr-3" />
                  French
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
