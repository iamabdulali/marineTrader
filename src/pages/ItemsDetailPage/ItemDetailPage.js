import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

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
import {
  fetchOptions,
  getAdvert,
  getOneAdvert,
} from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { Tooltip } from "react-tooltip";

const ItemDetailPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("itemOverview");
  const [advert, setAdvert] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [similarListings, setSimilarListings] = useState([]);

  const pathArray = window.location.pathname.split("/");
  console.log(pathArray);
  // const idString = pathArray[2]; // This will give you 'Yamaha-128'
  const id = pathArray[pathArray.length - 1];
  console.log(id);

  useEffect(() => {
    getOneAdvert(setAdvert, id, "advert-details", setLoading);
    setLoading(true);
  }, [refresh]);

  const { category, condition, price_type, make, model, year } = Object(advert);

  if (!advert) {
    navigate("/list");
  }

  const fetchSimilarListings = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}?category=${category?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSimilarListings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(refresh);

  useEffect(() => {
    fetchSimilarListings();
  }, [category]);

  const sliceListings = similarListings?.slice(0, 4);

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
    <LoadingWrapper
      loading={loading}
      className="xl:-translate-x-0 -translate-x-1/2"
    >
      <BuyerLayout showCategoryList={false}>
        <div className="2xl:px-24 sm:px-10 px-4">
          <Link
            to="/list"
            className="text-[#696E9D] text-sm flex gap-3 items-center mt-4"
          >
            <FaArrowLeft /> Back
          </Link>
          <div className="flex items-center justify-between mt-5">
            <p className="text-2xl font-semibold text-[#11133D]">
              {category?.name}
            </p>
            {/* <div className="flex items-center gap-4">
              <FaHeart
                color="#696E9D"
                size={20}
                data-tooltip-id="my-tooltip-3"
              />
              <FaShare
                color="#696E9D"
                size={20}
                data-tooltip-id="my-tooltip-4"
              />
            </div> */}
          </div>
          <Tooltip
            id="my-tooltip-3"
            place="bottom"
            content="Add To Favourites"
          />
          <Tooltip id="my-tooltip-4" place="bottom" content="Share Now" />

          <p className="text-sm font-semibold text-[#696E9D] mt-3">
            {condition?.name}
          </p>
          <SwiperSlider advert={advert} />
          {price_type == "1" ? (
            <div className="sm:hidden block">
              <OfferSectionHeader advert={advert} />
            </div>
          ) : (
            ""
          )}

          <div className="flex xl:flex-row flex-col gap-6 mt-8 items-start ">
            <div
              className={`${
                price_type == "enterInfo" ? "xl:w-8/12" : "w-full"
              }  w-full overflow-x-hidden`}
            >
              <div className="sm:overflow-x-hidden overflow-x-scroll tabs-div">
                <Tabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  handleTabClick={handleTabClick}
                  className="w-[700px] sm:text-base text-sm sm:w-full"
                />
              </div>
              <div className="tab-content xl:px-6 py-10">
                {selectedTab === "itemOverview" && (
                  <ItemOverview advert={advert} />
                )}
                {selectedTab === "specifications" && (
                  <Specifications advert={advert} />
                )}
                {selectedTab === "itemVideos" && <ItemVideos advert={advert} />}
              </div>
            </div>
            {price_type == "enterInfo" ? (
              <MakeOfferSection advert={advert} />
            ) : (
              ""
            )}
          </div>
          <div className="mt-28">
            <HomeHeading heading="More Like This" />
            <div className=" mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
              {sliceListings?.length == 0 ? (
                <p>No Related Listings Found</p>
              ) : (
                sliceListings?.map(
                  ({
                    id,
                    title,
                    price,
                    category_id,
                    images,
                    advert_package_id,
                  }) => (
                    <SpotLightListings
                      make={make}
                      model={model}
                      category={category}
                      year={year}
                      key={id}
                      id={id}
                      title={title}
                      category_id={category_id}
                      price={price}
                      image={images[0]?.image}
                      advertID={advert_package_id}
                      setRefresh={setRefresh}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </BuyerLayout>
    </LoadingWrapper>
  );
};

export default ItemDetailPage;
