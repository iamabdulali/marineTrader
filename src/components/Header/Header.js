import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const DefaultHeader = () => (
  <div className="header-container">
    {/* Logo */}
    <img
      src={require("../../assets/logo.png")}
      style={{ objectFit: "contain", width: 100, height: 100 }}
      alt="Logo"
    />
  </div>
);

const NotificationsHeader = () => (
  <div className="header-container">
    {/* Add code for the header with notifications */}
    {/* ... */}
  </div>
);

const CustomHeader = ({ userDetails }) => (
  <Link to="/">
    <div className="custom-header-container flex items-center justify-between w-full">
      <div className="flex items-center">
        <img
          src={require("../../assets/logo.png")}
          style={{ objectFit: "contain", width: 65, height: 65, marginLeft: 10 }}
          alt="Logo"
        />
      </div>
      {userDetails && userDetails.data && userDetails.data.name && (
        <span className="user-name flex-grow ml-3 p-3 text-right">
          Welcome {userDetails.data.name}
        </span>
      )}
    </div>
  </Link>
);


export default function Header(props) {
  const { headerType } = props;

  const user = localStorage.getItem("user") || "";
  let userDetails = {};

  try {
    // Attempt to parse the user data, handle empty string
    userDetails = JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    userDetails = {};
  }

  const renderHeader = () => {
    switch (headerType) {
      case "profile":
        return <NotificationsHeader />;
      case "login":
        return <CustomHeader userDetails={userDetails} />;
      default:
        return <DefaultHeader />;
    }
  };

  return renderHeader();
}
