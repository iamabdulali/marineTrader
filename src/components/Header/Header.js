import React, { useContext, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { bars, logo, notificationIcon, offerIcon } from "../../assets";
import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/isLoggedIn.js";
import { AuthContext } from "../../Context/AuthContext.js";
import Skeleton from "react-loading-skeleton";
import Modal from "../Modal.js";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions.js";
import FeedbackModal from "../Feedback/FeedbackModal.js";
import CustomDropdownMenu from "../CustomDropdownMenu.js";
import CountriesDropdown from "./CountriesDropdown.js";
import { useLocation } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate.js";

const Header = ({ menuState, setMenuState }) => {
  const { country } = useContext(AuthContext);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLogged = isUserLoggedIn();
  const [homePageMenu, setHomePageMenu] = useState(false);
  const [countryCode, setCountryCode] = useState(
    country ? country.countryCode : "UK"
  );
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (country) {
      setCountryCode(country.countryCode);
    }
  }, [country]);

  const { user_name, seller_type, image_field, main_picture } = Object(user);

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

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const paths = ["/"];

  const IsHomePage = () => {
    const location = useLocation();
    return paths.includes(location.pathname);
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

        <div
          className={`flex ${isLogged ? "items-baseline" : "items-center"} `}
        >
          {/* Language Dropdown */}
          {IsHomePage() ? (
            <div className="relative inline-block mr-7">
              <CustomDropdownMenu
                buttonToOpenMenu={
                  <>
                    <img
                      className="w-10 h-10 object-contain block"
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                        countryCode || "GB"
                      }.svg`}
                    />
                  </>
                }
                children={
                  <CountriesDropdown
                    setCountryCode={setCountryCode}
                    dispatch={dispatch}
                  />
                }
              />
            </div>
          ) : (
            ""
          )}

          <GoogleTranslate />

          {/* Bell and Notification Icons */}
          {isLogged ? (
            <div className="flex items-center space-x-4 mr-7">
              <Link to="/offers">
                <img src={offerIcon} className="sm:w-10 w-8" />
              </Link>
              <Link to="/notifications">
                <img src={notificationIcon} className="sm:w-10 w-8" />
              </Link>
              {isLogged ? (
                <FaCog
                  className="cursor-pointer"
                  onClick={() => openModal(setIsFeedbackModalOpen)}
                  size={24}
                  color="#0D1A8B"
                />
              ) : (
                ""
              )}
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

      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => closeModal(setIsFeedbackModalOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
        width="md:w-9/12 w-full"
      >
        <FeedbackModal onClick={() => closeModal(setIsFeedbackModalOpen)} />
      </Modal>
    </>
  );
};

export default Header;
