// SliderComponent.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FaChevronRight color="#fff" size={30} />,
    prevArrow: <FaChevronLeft color="#fff" size={60} />,
  };

  const {
    id,
    title,
    description,
    hours,
    year,
    price,
    condition,
    make,
    model,
    tags,
    user,
    images,
    advert_package_id,
  } = Object(itemData);

  const { phone_no, email } = Object(user);
  return (
    <>
      <Link
        key={id}
        to={`/itemDetails/${id}`}
        className={`${
          advert_package_id == "3"
            ? "bg-[#FEF9EE] border-4 mt-11 border-[#FFB800]"
            : "bg-[#F9FBFE]"
        } rounded-lg sm:px-5 sm:py-5 p-4 block`}
      >
        <div className={`flex md:flex-row flex-col gap-5 `}>
          <div className="lg:w-2/12 md:w-4/12 w-full relative">
            <Slider {...sliderSettings} className="list-slider">
              {images?.map(({ image, id }) => {
                return (
                  <img
                    key={id}
                    className="rounded-lg min-h-56 max-h-56 object-cover"
                    src={image}
                  />
                );
              })}
            </Slider>
            {advert_package_id == "3" ? (
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
          <div className="lg:w-10/12 md:w-8/12">
            {/* Item Heading */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="md:text-xl text-base text-[#11133D] font-semibold">
                  {title}
                </h2>
                <p className="bg-white md:flex hidden shadow-2xl  items-center justify-center custom-shadow rounded-full w-7 h-7">
                  <FaHeart color="#8891B2" />
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#11133D] md:text-xl text-base">
                  ${price}
                </p>
                <p className="text-[#8891B2] md:text-base text-sm">
                  Tax Not Paid
                </p>
              </div>
            </div>

            {/* Item Description */}
            <p className="text-[#696E9D] lg:w-9/12 lg:mt-0 mt-5 w-full md:text-base text-sm">
              {description}
            </p>

            {/* List of Features */}
            <div className="flex mt-6 gap-5 w-full lg:flex-nowrap flex-wrap">
              <div className="flex gap-3">
                <FaTools size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-sm">
                    Make
                  </p>
                  <p className="text-[#696E9D] text-sm">{make?.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaShip size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-sm">
                    Model
                  </p>
                  <p className="text-[#696E9D] text-sm">{model?.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCog size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-sm">
                    Condition
                  </p>
                  <p className="text-[#696E9D] text-sm">{condition?.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-sm">
                    Year
                  </p>
                  <p className="text-[#696E9D] text-sm">{year}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt size={20} color="#8891B2" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-sm">
                    Hours
                  </p>
                  <p className="text-[#696E9D] text-sm">{hours}</p>
                </div>
              </div>
              {/* Add more features as needed */}
            </div>

            {/* Tags */}
            <div className="flex lg:flex-nowrap flex-wrap mt-8 gap-4">
              {tags?.map(({ id, name }) => (
                <span
                  key={id}
                  className="bg-[#E0E3FB] text-sm font-semibold text-[#0D1A8B] px-4 py-1 rounded-md"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between sm:items-center mt-8 sm:flex-row flex-col ${
            advert_package_id == "2" ? "border-t-2 pt-6 pb-3" : ""
          }`}
        >
          {advert_package_id == "2" ? (
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
            className={`flex justify-end items-center gap-3 sm:mt-0 mt-5 ${
              advert_package_id == "2" ? "" : "w-full"
            }`}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${email}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <FaEnvelope size={24} color="#fff" />
            </a>
            {/* <p className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-12 h-12 rounded-xl flex items-center justify-center">
              <FaSms size={24} color="#fff" />
            </p> */}
            <a
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `tel:${phone_no}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <FaPhone size={24} color="#fff" />
            </a>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingItem;
