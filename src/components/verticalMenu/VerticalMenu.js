import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaStore,
  FaAddressBook,
  FaNewspaper,
  FaCalendarAlt,
  FaClipboardList,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { blueBg, logo, msgIcon, phoneIcon } from "../../assets";

const VerticalMenu = ({ menuState, setMenuState }) => {
  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <>
      <div
        id="sidebar-menu"
        className={`w-72 p-4 pb-20 bg-white fixed top-0 bottom-0 overflow-y-scroll z-[20] text-sm xl:-translate-x-0 transition-transform ${
          menuState ? "-translate-x-96" : "-translate-x-0"
        } `}
      >
        <div className="flex justify-center mb-16">
          <Link to="/">
            {" "}
            <img src={logo} className="w-28" />
          </Link>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="/dashboard"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaHome className="mr-3" size={18} />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/selling"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaStore className="mr-3" size={18} />
                Selling
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/directory"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaAddressBook className="mr-3" size={18} />
                Directory
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/news"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaNewspaper className="mr-3" size={18} />
                News
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/events"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaCalendarAlt className="mr-3" size={18} />
                Events
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/subscriptions"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaClipboardList className="mr-3" size={18} />
                Subscriptions
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/contact-mt"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaEnvelope className="mr-3" size={18} />
                Contact MT
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaSignOutAlt className="mr-3" size={18} />
                Sign Out
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-14 text-white relative flex justify-center">
          <img src={blueBg} className="rounded-3xl" />
          <div className="absolute flex flex-col items-center top-1/2 -translate-y-1/2">
            <img src={phoneIcon} className="w-10 mb-3" />
            <p>+44 7700 900077</p>
            <img src={msgIcon} className="w-10 my-3" />
            <a href="mailto:dealer@example.com">dealer@example.com</a>
          </div>
        </div>
      </div>

      {menuState ? (
        ""
      ) : (
        <div
          onClick={() => {
            toggleMenu();
          }}
          className="fixed inset-0 w-full bg-black bg-opacity-40 z-10 xl:hidden block"
        ></div>
      )}
    </>
  );
};

export default VerticalMenu;
