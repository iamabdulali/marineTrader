import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const VerticalMenu = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 1, icon: require("../../assets/selling.png"), text: "Selling" },
    {
      id: 2,
      icon: require("../../assets/shopping-cart.png"),
      text: "Directory",
    },
    { id: 3, icon: require("../../assets/news.png"), text: "News" },
    { id: 4, icon: require("../../assets/events.png"), text: "Events" },
    {
      id: 5,
      icon: require("../../assets/subscriptions.png"),
      text: "Subscriptions",
    },
    { id: 6, icon: require("../../assets/contact.png"), text: "Contact" },
    { id: 7, icon: require("../../assets/signOut.png"), text: "Sign Out" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabClick(tabId);
    // Close the mobile menu after clicking a tab
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    localStorage.removeItem("user");
    navigate("/login");

    // You might want to call a function from your authentication context to handle the sign-out process
  };

  return (
    <div className="flex flex-col lg:flex-row bg-blue-700 text-white w-48 lg:w-auto h-screen lg:h-auto rounded-lg">
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <button
          className="p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Tabs Section */}
      <div
        className={`flex flex-col lg:flex-row p-2 w-full lg:w-48 pt-2 ${
          isMobileMenuOpen ? "block" : "hidden lg:block"
        }`}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center p-2 ${
              activeTab === tab.id ? "bg-blue-700" : "hover:bg-blue-100"
            } rounded-lg mt-1 cursor-pointer transition duration-300`}
            onClick={() =>
              tab.id === 7 ? handleSignOut() : handleTabClick(tab.id)
            }
          >
            <img
              src={tab.icon}
              alt={`Icon ${tab.id}`}
              className="w-3/12 lg:w-6 mr-2"
            />
            <span className="text-sm font-semibold">{tab.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalMenu;
