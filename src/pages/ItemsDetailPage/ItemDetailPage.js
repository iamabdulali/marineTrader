import React, { useState } from "react";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import {
  FaArrowLeft,
  FaClipboardList,
  FaEnvelope,
  FaFlag,
  FaHeart,
  FaPhone,
  FaSearch,
  FaShare,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import SwiperSlider from "./SwiperSlider";
import Tabs from "../../components/Tabs";
import ItemOverview from "./ItemOverview";
import Specifications from "./Specifications";
import ItemVideos from "./ItemVideos";

import HomeHeading from "../../components/HomeHeading";
import { SpotLightListingsData2 } from "../../utils/DummyData";
import SpotLightListings from "../../components/SpotLightListings/SpotLightListings";
import MakeOfferSection from "./MakeOfferSection";
import OfferSectionHeader from "./OfferSectionHeader";

const ItemDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState("itemOverview");

  const tabs = [
    {
      id: "itemOverview",
      label: (
        <div className="flex items-center gap-2 justify-center">
          <FaClipboardList size={19} /> Overview
        </div>
      ),
    },
    {
      id: "specifications",
      label: (
        <div className="flex items-center gap-2 justify-center">
          <FaSearch size={19} /> Specifications
        </div>
      ),
    },
    {
      id: "itemVideos",
      label: (
        <div className="flex items-center gap-2 justify-center">
          <FaVideo size={19} /> Videos
        </div>
      ),
    },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <BuyerLayout showCategoryList={false}>
      <div className="2xl:px-24 sm:px-10 px-4">
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
        <div className="sm:hidden block">
          <OfferSectionHeader />
        </div>
        <div className="flex xl:flex-row flex-col gap-6 mt-8 items-start ">
          <div className="xl:w-8/12 w-full overflow-x-hidden">
            <div className="sm:overflow-x-hidden overflow-x-scroll tabs-div">
              <Tabs
                tabs={tabs}
                selectedTab={selectedTab}
                handleTabClick={handleTabClick}
                className="w-[700px] sm:text-base text-sm sm:w-full"
              />
            </div>
            <div className="tab-content xl:px-6 py-10">
              {selectedTab === "itemOverview" && <ItemOverview />}
              {selectedTab === "specifications" && <Specifications />}
              {selectedTab === "itemVideos" && <ItemVideos />}
            </div>
          </div>
          <MakeOfferSection />
        </div>
        <div className="mt-28">
          <HomeHeading heading="You May Also Like" />
          <div className=" mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
            {SpotLightListingsData2.map(
              ({ listingType, listingName, listingPrice, isFeatured, id }) => (
                <SpotLightListings
                  id={id}
                  key={id}
                  listingType={listingType}
                  listingName={listingName}
                  listingPrice={listingPrice}
                  isFeatured={isFeatured}
                />
              )
            )}
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default ItemDetailPage;
