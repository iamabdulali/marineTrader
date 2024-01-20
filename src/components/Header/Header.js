import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { flagUsa, notificationIcon, userProfile } from "../../assets";
import { Link } from "react-router-dom";

const Header = () => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="bg-white px-10 py-6 flex justify-end gap-6 items-center">
      {/* Language Dropdown */}
      <div className="relative inline-block">
        <button
          onClick={toggleLanguageDropdown}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img src={flagUsa} className="w-6" />
          <FaChevronDown size={12} color="#696E9D" />
        </button>
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
      <div className="flex items-center space-x-4">
        <Link to="/offers">
          <img src={notificationIcon} className="w-10" />
        </Link>
      </div>

      {/* User Picture and Menu */}
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
    </div>
  );
};

export default Header;
