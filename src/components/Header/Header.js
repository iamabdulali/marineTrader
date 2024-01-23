import React, { useState } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa";
import {
  flagUsa,
  logo,
  notificationIcon,
  offerIcon,
  userProfile,
} from "../../assets";
import { Link } from "react-router-dom";

const Header = () => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div
      className={`bg-white  py-7 flex gap-6 items-center ${
        isLogged ? "justify-end px-10" : "justify-between border-b-2 px-24"
      }`}
    >
      {isLogged ? (
        ""
      ) : (
        <div className="flex items-center gap-16">
          <img src={logo} className="w-28" />
          <ul className="flex items-center gap-10">
            <li className="text-[#696E9D]">
              <Link to="/watercraft">WaterCraft</Link>
            </li>
            <li className="text-[#696E9D]">
              <Link to="/directory">Directory</Link>
            </li>
            <li className="text-[#696E9D]">
              <Link to="/news">News</Link>
            </li>
            <li className="text-[#696E9D]">
              <Link to="/events">Events</Link>
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-center">
        {/* Language Dropdown */}
        <div className="relative inline-block mr-7">
          <div className="flex items-center gap-7">
            {isLogged ? (
              ""
            ) : (
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaGlobe size={20} color="#696E9D" />
                <FaChevronDown size={12} color="#696E9D" />
              </button>
            )}
            <button
              onClick={toggleLanguageDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src={flagUsa} className="w-6" />
              <FaChevronDown size={12} color="#696E9D" />
            </button>
          </div>

          {languageDropdownOpen && (
            <div className="absolute w-max mt-2 bg-white border rounded shadow-lg">
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
          )}
        </div>

        {/* Bell and Notification Icons */}
        {isLogged ? (
          <div className="flex items-center space-x-4 mr-7">
            <Link to="/offers">
              <img src={offerIcon} className="w-10" />
            </Link>
            <Link to="/notifications">
              <img src={notificationIcon} className="w-10" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-7">
            <Link to="/register" className="text-[#0D1A8B] font-medium">
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-[#0D1A8B] text-white rounded-md py-2 px-5"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* User Picture and Menu */}
        {isLogged ? (
          <div className="relative inline-block">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="flex items-center justify-start gap-3 text-left">
                <img src={userProfile} className="w-10" />
                <div>
                  <span className="text-[#151D48] items-center font-semibold text-left flex">
                    Musfiq <FaChevronDown className="ml-16" size={12} />
                  </span>
                  <span className="text-[#737791] text-sm">Trade Seller</span>
                </div>
              </div>
            </button>
            {userMenuOpen && (
              <div className="absolute z-10 mt-2 min-w-36 bg-white border rounded shadow-lg">
                <button className="py-2 px-4 block">Profile</button>
                <button className="py-2 px-4 block">Settings</button>
                <button className="py-2 px-4 block">Logout</button>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
