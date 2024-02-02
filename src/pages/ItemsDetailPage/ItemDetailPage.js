import React, { useState } from "react";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import { FaArrowLeft, FaHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  sliderImage,
  thumb1,
  thumb2,
  thumb3,
  thumb4,
  thumb5,
  thumb6,
} from "../../assets";
import SwiperSlider from "./SwiperSlider";
import Tabs from "../../components/Tabs";
import CompanyInfo from "../UserProfile/CompanyInfo";
import BusinessDetails from "../UserProfile/BusinessDetails";
import ContactPersonDetails from "../UserProfile/ContactPersonDetails";

const ItemDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState("companyInfo");

  const tabs = [
    { id: "companyInfo", label: "Company Info" },
    { id: "businessDetails", label: "Business Details" },
    { id: "contactPersonDetails", label: "Contact Person Details" },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const images = [
    sliderImage,
    thumb1,
    thumb2,
    thumb3,
    thumb4,
    thumb5,
    thumb6,
    // Add more image URLs as needed
  ];
  const [mainSlider, setMainSlider] = useState(0);

  const mainSliderSettings = {
    onSlideChange: (swiper) => setMainSlider(swiper.activeIndex),
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: true,
  };

  const thumbSliderSettings = {
    onSlideChange: (swiper) => setMainSlider(swiper.activeIndex),
    spaceBetween: 10,
    slidesPerView: 3,
    navigation: true,
  };

  return (
    <BuyerLayout showCategoryList={false}>
      <div className="px-24">
        <Link className="text-[#696E9D] text-sm flex gap-3 items-center mt-4">
          <FaArrowLeft /> Back
        </Link>
        <div className="flex items-center justify-between mt-5">
          <p className="text-2xl font-semibold text-[#11133D]">
            Jet Ski Super 600
          </p>
          <div className="flex items-center gap-4">
            <FaHeart color="#696E9D" size={20} />
            <FaShare color="#696E9D" size={20} />
          </div>
        </div>
        <p className="text-sm font-semibold text-[#696E9D] mt-3">
          Like New Condition
        </p>
        <SwiperSlider />
        <div className="w-8/12">
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            handleTabClick={handleTabClick}
          />
          <div className="tab-content px-6 py-10">
            {selectedTab === "companyInfo" && <CompanyInfo />}
            {selectedTab === "businessDetails" && <BusinessDetails />}
            {selectedTab === "contactPersonDetails" && <ContactPersonDetails />}
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default ItemDetailPage;
