import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaGlobe, FaHamburger } from "react-icons/fa";
import {
  bars,
  flagUsa,
  logo,
  notificationIcon,
  offerIcon,
  userProfile,
} from "../../assets";
import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/isLoggedIn.js";
import { AuthContext } from "../../Context/AuthContext.js";
import Skeleton from "react-loading-skeleton";

const Header = ({ menuState, setMenuState }) => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLogged = isUserLoggedIn();
  const [homePageMenu, setHomePageMenu] = useState(false);
  const { user, userLocationDetails } = useContext(AuthContext);

  const { user_name, seller_type, image_field, main_picture } = Object(user);
  const { countryCode } = Object(userLocationDetails);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleMenu = () => {
    // Example logic to toggle menu state
    setMenuState(!menuState);
  };

  return (
    <>
      <div
        className={`bg-white  py-7 flex gap-6 items-center ${
          isLogged
            ? "justify-between sm:px-10 px-6"
            : "justify-between border-b-2 2xl:px-24 sm:px-10 px-6"
        }`}
      >
        {isLogged ? (
          <>
            <img
              onClick={() => {
                toggleMenu();
              }}
              className="sm:w-6 w-5 cursor-pointer "
              src={bars}
              alt="hamburger-menu"
            />
          </>
        ) : (
          <>
            <img
              onClick={() => {
                setHomePageMenu(!homePageMenu);
              }}
              className="sm:w-6 w-5 cursor-pointer lg:hidden block"
              src={bars}
              alt="hamburger-menu"
            />
            <div className="lg:flex hidden items-center gap-16">
              <img src={logo} className="w-28" />
              <ul className="flex items-center gap-10">
                {/* <li className="text-[#696E9D]">
                  <Link to="/watercraft">WaterCraft</Link>
                </li> */}
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
            <div
              className={`w-72 p-4 px-0 pb-20 left-0 lg:hidden bg-white fixed top-0 bottom-0  z-[20] text-sm lg:-translate-x-0 transition-transform ${
                homePageMenu ? "-translate-x-0" : "-translate-x-96"
              }`}
            >
              <img src={logo} className="w-28 my-4 mx-8" />
              <ul className="flex flex-col mt-10 w-full">
                {/* <li className="text-[#696E9D] font-semibold  hover:bg-[#F0F1FA] hover:text-[#0D1A8B] py-4 px-8">
                  <Link to="/watercraft">WaterCraft</Link>
                </li> */}
                <li className="text-[#696E9D] font-semibold hover:bg-[#F0F1FA] hover:text-[#0D1A8B] py-4 px-8">
                  <Link to="/directory">Directory</Link>
                </li>
                <li className="text-[#696E9D] font-semibold hover:bg-[#F0F1FA] hover:text-[#0D1A8B] py-4 px-8">
                  <Link to="/news">News</Link>
                </li>
                <li className="text-[#696E9D] font-semibold hover:bg-[#F0F1FA] hover:text-[#0D1A8B] py-4 px-8">
                  <Link to="/events">Events</Link>
                </li>
                <li className="text-[#696E9D] font-semibold hover:bg-[#F0F1FA] hover:text-[#0D1A8B] py-4 px-8 sm:hidden block">
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            </div>
          </>
        )}

        <div className="flex items-center">
          {/* <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
            className="w-10 h-10 object-contain block mr-6"
          /> */}
          {/* Language Dropdown */}
          {/* <div className="relative inline-block mr-7">
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
          </div> */}

          {/* Bell and Notification Icons */}
          {isLogged ? (
            <div className="flex items-center space-x-4 mr-7">
              <Link to="/offers">
                <img src={offerIcon} className="sm:w-10 w-8" />
              </Link>
              <Link to="/notifications">
                <img src={notificationIcon} className="sm:w-10 w-8" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-7">
              <Link
                to="/login"
                className="text-[#0D1A8B] font-medium sm:block hidden"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-[#0D1A8B] text-white text-sm sm:text-base  rounded-md py-2 px-5"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* User Picture and Menu */}
          {isLogged ? (
            <div className="relative inline-block">
              <Link
                to="/userProfile"
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="flex items-center justify-start gap-3 text-left">
                  {image_field || main_picture ? (
                    <img
                      src={image_field || main_picture}
                      className="w-10 h-10  rounded-full object-cover object-top"
                    />
                  ) : (
                    <Skeleton
                      className="w-10 h-10 block"
                      circle={true}
                      containerClassName="w-10 h-10 block"
                    />
                  )}

                  <div className="hidden sm:block">
                    <p className="text-[#151D48] items-center font-semibold text-left flex gap-2">
                      <span className="min-w-20">
                        {user_name || <Skeleton />}
                      </span>
                      {/* <FaChevronDown size={12} /> */}
                    </p>
                    <span className="text-[#737791] text-sm capitalize">
                      {seller_type || <Skeleton />}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {homePageMenu ? (
        <div
          onClick={() => {
            setHomePageMenu(!homePageMenu);
          }}
          className="fixed inset-0 w-full bg-black bg-opacity-40 z-10 xl:hidden block"
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
