import React from "react";
import { Link } from "react-router-dom";
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

const VerticalMenu = () => {
  return (
    <div
      id="sidebar-menu"
      className="w-72 p-4 pb-20 bg-white fixed top-0 bottom-0 overflow-y-scroll text-sm"
    >
      <div className="flex justify-center mb-16">
        <img src={logo} className="w-28" />
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="flex items-center bg-[#0D1A8B] py-4 px-4 text-white rounded-xl"
            >
              <FaHome className="mr-3" size={18} />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/selling"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaStore className="mr-3" size={18} />
              Selling
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/directory"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaAddressBook className="mr-3" size={18} />
              Directory
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/news"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaNewspaper className="mr-3" size={18} />
              News
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/events"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaCalendarAlt className="mr-3" size={18} />
              Events
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/subscriptions"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaClipboardList className="mr-3" size={18} />
              Subscriptions
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/contact-mt"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaEnvelope className="mr-3" size={18} />
              Contact MT
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/sign-out"
              className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200 active:bg-blue-800 active:text-white"
            >
              <FaSignOutAlt className="mr-3" size={18} />
              Sign Out
            </Link>
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
  );
};

export default VerticalMenu;
