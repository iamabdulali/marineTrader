// SliderComponent.js
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tooltip } from "react-tooltip";

import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaEnvelope,
  FaHandHoldingUsd,
  FaMapMarkedAlt,
  FaPhone,
  FaShip,
  FaTools,
} from "react-icons/fa";
import { featuredRevert, logo } from "../../assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { GetCountries } from "react-country-state-city/dist/cjs";
import { BiDroplet } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";

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
    user: listItemUser,
    images,
    price_type,
    advert_package_id,
    warranty,
    water_test_facility,
    part_exchange_available,
    finance_available,
  } = Object(itemData);

  const { currencyRates, user } = useContext(AuthContext);

  const { currency } = Object(user);
  const {
    phone_no,
    email,
    country,
    company_logo,
    image_field,
    city,
    region,
    user_name,
    seller_type,
  } = Object(listItemUser);

  const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [AllStates, setAllStates] = useState([]);
  // const [cityByStates, setCitiesByStates] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
    // getOptions(
    //   "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json",
    //   setStates
    // );

    // getOptions(
    //   "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json",
    //   setCities
    // );
  }, []);

  function getCountry(countryName) {
    const country = countries.find((country) => country?.id == countryName);
    return country;
  }

  // useEffect(() => {
  //   setAllStates((prevStates) => {
  //     const newStates = cities?.reduce((acc, city) => {
  //       return acc.concat(Object(city)?.states);
  //     }, []);

  //     return [...prevStates, ...newStates];
  //   });
  // }, [cities]);

  // function getCitiesByStates(stateID) {
  //   const selectedCities = AllStates?.find((state) => state?.id == stateID);
  //   setCitiesByStates(selectedCities?.cities);
  // }

  // function getCity(ID) {
  //   const city = cityByStates?.find((city) => city?.id == ID);
  //   return city;
  // }

  // useEffect(() => {
  //   getCitiesByStates(region);
  //   getCity(city);
  // }, [states, countries, AllStates]);

  // console.log(currencyRates[currency?.currency_code]);
  return (
    <>
      <Link
        key={id}
        to={`/itemDetails/${id}`}
        className={`${
          advert_package_id == "3"
            ? "bg-[#FEF9EE] border-4  border-[#FFB800]"
            : "bg-[#F9FBFE]"
        } rounded-lg sm:px-5 sm:py-5 p-4 block mt-11`}
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
                {/* <p className="bg-white md:flex hidden shadow-2xl  items-center justify-center custom-shadow rounded-full w-7 h-7">
                  <FaHeart color="#8891B2" />
                </p> */}
              </div>
              <div>
                {price_type == "poa" ? (
                  <p className="font-semibold text-right text-[#11133D] md:text-xl text-base">
                    POA
                  </p>
                ) : (
                  <p className="font-semibold text-[#11133D] md:text-xl text-base">
                    {`${currency?.symbol || "£"}${Number(
                      Number(price) * currencyRates[currency?.currency_code] ||
                        price
                    ).toFixed(2)}`}
                  </p>
                )}

                <p className="text-[#8891B2] md:text-base text-sm">
                  Tax Not Paid
                </p>
              </div>
            </div>

            {/* Item Description */}
            {/* <p className="text-[#696E9D] lg:w-9/12 lg:mt-0 mt-5 w-full md:text-base text-sm">
              {description}
            </p> */}

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
            {console.log(warranty, water_test_facility, finance_available)}
            <div className="flex items-center justify-end sm:gap-5 gap-4">
              {/* finance_available */}
              {finance_available == "yes" ? (
                <FaHandHoldingUsd
                  data-tooltip-id={"my-tooltip-9"}
                  size={24}
                  fill="#696E9D"
                />
              ) : (
                ""
              )}

              {warranty == "yes" ? (
                <CiDeliveryTruck
                  data-tooltip-id={"my-tooltip-10"}
                  size={30}
                  fill="#696E9D"
                />
              ) : (
                ""
              )}
              {water_test_facility == "yes" ? (
                <BiDroplet
                  data-tooltip-id={"my-tooltip-11"}
                  size={20}
                  fill="#696E9D"
                />
              ) : (
                ""
              )}
              {part_exchange_available == "yes" ? (
                <FaTools
                  data-tooltip-id={"my-tooltip-12"}
                  size={20}
                  fill="#696E9D"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Tooltip id="my-tooltip-9" place="bottom" content="Finance" />
        <Tooltip id="my-tooltip-10" place="bottom" content="Warrenty" />
        <Tooltip
          id="my-tooltip-11"
          place="bottom"
          content="Water Test Facility"
        />
        <Tooltip id="my-tooltip-12" place="bottom" content="Part Exchange" />
        <div
          className={`flex  sm:items-center mt-8 sm:flex-row flex-col ${
            advert_package_id == "3"
              ? "border-t-2 pt-6 pb-3 justify-between"
              : "justify-end"
          }`}
        >
          {advert_package_id == "1" ? (
            ""
          ) : (
            <div className="flex gap-8 w-full">
              <img
                src={company_logo || image_field || logo}
                className="border-[1px] w-20 object-cover bg-white rounded-lg"
              />
              <div className="w-full">
                <p className="text-[#11133D] font-semibold">{user_name}</p>
                <p className="text-[#8891B2] capitalize font-medium mt-1 mb-2 text-sm">
                  {seller_type}
                </p>
                <p className="flex text-sm font-semibold items-center gap-3 text-[#11133D]">
                  <FaMapMarkedAlt color="#8891B2" size={28} /> {city}
                  {city == undefined || null ? "" : ","}{" "}
                  {getCountry(country)?.name}
                </p>
              </div>
            </div>
          )}
          <div
            className={`flex justify-end items-center gap-3 sm:mt-0 mt-5 ${
              advert_package_id == "2" ? "" : "w-full"
            }`}
          >
            <a
              data-tooltip-id="my-tooltip-20"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${email}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <FaEnvelope size={24} color="#fff" />
            </a>
            <Tooltip id="my-tooltip-20" place="bottom" content={email} />
            <a
              data-tooltip-id="my-tooltip-21"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `tel:${phone_no}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <FaPhone size={24} color="#fff" />
            </a>
            <Tooltip id="my-tooltip-21" place="bottom" content={phone_no} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingItem;
