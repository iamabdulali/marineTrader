// CompanyInfo.js
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaPencilAlt } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import { cameraIcon, coverPhoto } from "../../assets";
import BusinessDetails from "./BusinessDetails";
import ContactPersonDetails from "./ContactPersonDetails";
import CompanyInfo from "./CompanyInfo";

const UserInfo = () => {
  const [selectedTab, setSelectedTab] = useState("companyInfo");
  const [coverPhotoSrc, setCoverPhotoSrc] = useState(coverPhoto);
  const [profilePhotoSrc, setProfilePhotoSrc] = useState(coverPhoto);
  const [userData, setUserData] = useState({
    username: "",
    companyName: "",
    // Add more fields as needed
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setCoverPhotoSrc(reader.result);
        } else if (type === "profile") {
          setProfilePhotoSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "companyInfo", label: "Company Info" },
    { id: "businessDetails", label: "Business Details" },
    { id: "contactPersonDetails", label: "Contact Person Details" },
    // Add more tabs as needed
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between rounded-lg  shadow-[7px] bg-white font-semibold py-5 px-7">
        <p className="">User Profile</p>
        <p className="flex items-center gap-2 underline text-[#0D1A8B]">
          <FaPencilAlt />
          Edit
        </p>
      </div>
      <div className="mt-6 flex smallLg:flex-row flex-col rounded-lg bg-white min-h-screen">
        <div className="smallLg:w-4/12 w-full bg-[#EDF1FE] smallLg:rounded-tl-lg smallLg:rounded-bl-lg smallLg:mb-0 mb-4">
          <div className="relative">
            <img
              src={coverPhotoSrc || coverPhoto}
              className="min-h-[270px] smallLg:max-h-[270px] max-h-[450px] w-full object-cover"
            />
            <label
              htmlFor="coverPhotoInput"
              className="flex items-center absolute top-5 right-5 gap-2 underline text-[#fff] cursor-pointer"
            >
              <FaPencilAlt />
              Edit
            </label>
            <input
              type="file"
              id="coverPhotoInput"
              accept="image/*"
              onChange={handleFileUpload("cover")}
              className="hidden"
            />
          </div>
          <div className="relative -top-20 w-40 mx-auto">
            <img
              src={profilePhotoSrc || coverPhoto}
              alt="Profile Photo"
              className="rounded-full w-40 h-40 object-cover border-4 border-[#CDD0F0]"
            />
            <label
              htmlFor="profilePhotoInput"
              className="absolute w-14 bottom-0 right-0 cursor-pointer"
            >
              <img src={cameraIcon} alt="camera-icon" />
            </label>
            <input
              type="file"
              id="profilePhotoInput"
              accept="image/*"
              onChange={handleFileUpload("profile")}
              className="hidden"
            />
          </div>
        </div>
        <div className="smallLg:w-8/12 w-full overflow-x-hidden">
          <div className="sm:overflow-x-hidden overflow-x-scroll userProfileTab">
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              handleTabClick={handleTabClick}
              className="xl:text-base text-sm sm:w-auto w-[700px]"
            />
          </div>
          <div className="tab-content px-6 py-10">
            {selectedTab === "companyInfo" && <CompanyInfo />}
            {selectedTab === "businessDetails" && <BusinessDetails />}
            {selectedTab === "contactPersonDetails" && <ContactPersonDetails />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;
