// SliderComponent.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaCalendarAlt,
  FaCog,
  FaEnvelope,
  FaHeart,
  FaLocationArrow,
  FaMap,
  FaMapMarked,
  FaMapMarkedAlt,
  FaMarkdown,
  FaPhone,
  FaSearchLocation,
  FaShip,
  FaSms,
  FaTools,
  FaTrademark,
} from "react-icons/fa";
import { featuredImage, featuredRevert, logo } from "../../assets";
import SelectDropdown from "../SelectDropdown";
import { Link } from "react-router-dom";

const ListingItem = ({ itemData }) => {
  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Link
        className={`${
          itemData.featured
            ? "bg-[#FEF9EE] border-4 mt-11 border-[#FFB800]"
            : "bg-[#F9FBFE]"
        } rounded-lg px-5 py-5 block`}
      >
        <div className={`flex  gap-5 `}>
          <div className="w-2/12 relative">
            <Slider {...sliderSettings}>
              <img
                className="rounded-lg min-h-56 max-h-56 object-cover"
                src={require("../../assets/jetski-3.png")}
                alt="Slider Image 1"
              />
              <img
                className="rounded-lg max-h-56 object-cover"
                src={require("../../assets/jetSkiPerson.png")}
                alt="Slider Image 2"
              />
            </Slider>
            {itemData.featured ? (
              <img
                src={featuredRevert}
                className="w-28 absolute top-0 right-0"
                alt="featured-image"
              />
            ) : (
              ""
            )}
          </div>

          {/* Right Side - Item Details */}
          <div className="w-10/12 ">
            {/* Item Heading */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl text-[#11133D] font-semibold">
                  {itemData.heading}
                </h2>
                <p className="bg-white shadow-2xl flex items-center justify-center custom-shadow rounded-full w-7 h-7">
                  <FaHeart color="#8891B2" />
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#11133D] text-xl">$12,000</p>
                <p className="text-[#8891B2]">Tax Not Paid</p>
              </div>
            </div>

            {/* Item Description */}
            <p className="text-[#696E9D] w-9/12">{itemData.description}</p>

            {/* List of Features */}
            <div className="flex mt-6 gap-5 w-full">
              <div className="flex gap-3">
                <FaTools size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium">Make</p>
                  <p className="text-[#696E9D] text-sm">{itemData.make}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaShip size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium">Model</p>
                  <p className="text-[#696E9D] text-sm">{itemData.model}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCog size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium">Condition</p>
                  <p className="text-[#696E9D] text-sm">{itemData.condition}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium">Year</p>
                  <p className="text-[#696E9D] text-sm">{itemData.year}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium">Hours</p>
                  <p className="text-[#696E9D] text-sm">{itemData.hours} Hrs</p>
                </div>
              </div>
              {/* Add more features as needed */}
            </div>

            {/* Tags */}
            <div className="flex mt-8 gap-4">
              {itemData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#E0E3FB] text-sm font-semibold text-[#0D1A8B] px-4 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between items-center mt-8 ${
            itemData.sellerInfo ? "border-t-2 pt-6 pb-3" : ""
          }`}
        >
          {itemData.sellerInfo ? (
            <div className="flex gap-8">
              <img
                src={logo}
                className="border-[1px] w-20 object-cover bg-white rounded-lg"
              />
              <div>
                <p className="text-[#11133D] font-semibold">Marine Trader</p>
                <p className="text-[#8891B2] font-medium mt-1 mb-2 text-sm">
                  Trade Seller
                </p>
                <p className="flex text-sm font-semibold items-center gap-3 text-[#11133D]">
                  <FaMapMarkedAlt color="#8891B2" size={18} /> United Kingdom
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className={`flex justify-end items-center gap-3 ${
              itemData.sellerInfo ? "" : "w-full"
            }`}
          >
            <p className="bg-[#0D1A8B] w-12 h-12 rounded-xl flex items-center justify-center">
              <FaEnvelope size={24} color="#fff" />
            </p>
            <p className="bg-[#0D1A8B] w-12 h-12 rounded-xl flex items-center justify-center">
              <FaSms size={24} color="#fff" />
            </p>
            <p className="bg-[#0D1A8B] w-12 h-12 rounded-xl flex items-center justify-center">
              <FaPhone size={24} color="#fff" />
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingItem;
