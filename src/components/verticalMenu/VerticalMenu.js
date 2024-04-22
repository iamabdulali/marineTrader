import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import { AuthContext } from "../../Context/AuthContext";
import Modal from "../Modal";
import SignOutModal from "../SignOutModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";

const VerticalMenu = ({ menuState, setMenuState }) => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const { dispatch, user } = useContext(AuthContext);
  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const paths = [
    "/",
    "/:id/list",
    "/list",
    "/:id/itemDetails",
    "/itemDetails",
    "/:id",
  ];

  const IsHomePage = () => {
    const location = useLocation();

    // Check if the current location pathname is in the static paths
    if (paths.includes(location.pathname)) {
      return true;
    }

    // Check if the current location pathname starts with "/itemDetails/"
    if (location.pathname.startsWith("/itemDetails/")) {
      return true;
    }

    // Check if the current path matches any of the paths in the array
    return paths.some((path) => {
      // Use a regular expression to match dynamic routes like "/:id"
      const regex = new RegExp("^" + path.replace(/:[^\s/]+/g, "[^/]+") + "$");
      return regex.test(location.pathname);
    });

    return false;
  };

  const { phone_no, email, seller_type } = Object(user);

  return (
    <>
      <div
        id="sidebar-menu"
        className={`w-72 ${
          IsHomePage() ? "" : "dashboard-page"
        } p-4 pb-20 bg-white fixed top-0 bottom-0 overflow-y-scroll z-[20] text-sm  transition-transform ${
          menuState ? "-translate-x-0" : " -translate-x-96"
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
            {seller_type != "private seller" ? (
              <li className="mb-4">
                <NavLink
                  to="/subscriptions"
                  className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
                >
                  <FaClipboardList className="mr-3" size={18} />
                  Subscriptions
                </NavLink>
              </li>
            ) : (
              ""
            )}

            <li className="mb-4">
              <NavLink
                to="/contact"
                className="flex items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              >
                <FaEnvelope className="mr-3" size={18} />
                Contact MT
              </NavLink>
            </li>
            <li
              className="flex cursor-pointer items-center py-4 px-4 text-[#8891B2] rounded-xl hover:bg-gray-200"
              onClick={() => openModal(setIsSignOutModalOpen)}
            >
              <FaSignOutAlt className="mr-3" size={18} /> Sign Out
            </li>
          </ul>
        </nav>
        <div className="mt-14 text-white relative flex justify-center">
          <img src={blueBg} className="rounded-3xl" />
          <div className="absolute flex flex-col items-center top-1/2 -translate-y-1/2">
            <img src={phoneIcon} className="w-10 mb-3" />
            <p>{phone_no}</p>
            <img src={msgIcon} className="w-10 my-3" />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </div>

      {menuState ? (
        <div
          onClick={() => {
            toggleMenu();
          }}
          className="fixed inset-0 w-full bg-black bg-opacity-40 z-10  block"
        ></div>
      ) : (
        ""
      )}

      <Modal
        isOpen={isSignOutModalOpen}
        onClose={() => closeModal(setIsSignOutModalOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
      >
        <SignOutModal
          setMenuState={setMenuState}
          onClick={() => {
            setMenuState(false);
            closeModal(setIsSignOutModalOpen);
          }}
        />
      </Modal>
    </>
  );
};

export default VerticalMenu;
