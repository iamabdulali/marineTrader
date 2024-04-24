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
  FaDollarSign,
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
import Modal from "../Modal";
import MakeOfferForm from "../ItemDetailsPage/MakeOfferForm";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { makeOfferValidationSchema } from "../../utils/ValidationSchema";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";

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
    category,
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
  const [spinner, setSpinner] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

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
    currency_id,
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

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    offer: "",
    currency: currency_id,
    advert: id,
  };

  const handleFormSubmit = async (values) => {
    // Your logic for handling form submission
    console.log("Form submitted with values:", values);
    setSpinner(true);

    try {
      const { data } = await axios.post(`${SERVER_BASE_URL}/offer`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      toast.success(data.message);
      setSpinner(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <>
      <Link
        key={id}
        // to={`/listings/${make?.name}-${id}`}
        to={`/listings/${category?.name}/${make?.name}-${model?.name}-${year}/${id}`}
        className={`${
          advert_package_id == "3"
            ? "bg-[#FEF9EE] border-4  border-[#FFB800]"
            : "bg-[#F9FBFE]"
        } rounded-lg sm:px-5 sm:py-5 p-4 block mt-11 border-4 border-[#11133D]`}
      >
        <div className={`flex md:flex-row flex-col gap-5 `}>
          <div className="lg:w-2/12 md:w-4/12 w-full relative">
            <Slider {...sliderSettings} className="list-slider">
              {images?.map(({ image, id }) => {
                return (
                  <img
                    key={id}
                    className="rounded-lg min-h-32 max-h-32 object-cover"
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

                <p className="text-[#8891B2] md:text-base sm:text-sm text-[12px]">
                  Tax Not Paid
                </p>
              </div>
            </div>

            {/* Item Description */}
            {/* <p className="text-[#696E9D] lg:w-9/12 lg:mt-0 mt-5 w-full md:text-base text-sm">
              {description}
            </p> */}

            {/* List of Features */}
            <div className="flex sm:mt-6 mt-3 gap-5 w-full lg:flex-nowrap flex-wrap">
              <div className="flex gap-3">
                <FaTools
                  size={20}
                  color="#8891B2"
                  className="sm:block hidden"
                />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-[12px]">
                    Make
                  </p>
                  <p className="text-[#696E9D] sm:text-sm text-[12px]">
                    {make?.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaShip size={20} color="#8891B2" className="sm:block hidden" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-[12px]">
                    Model
                  </p>
                  <p className="text-[#696E9D] sm:text-sm text-[12px]">
                    {model?.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCog size={20} color="#8891B2" className="sm:block hidden" />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-[12px]">
                    Condition
                  </p>
                  <p className="text-[#696E9D] sm:text-sm text-[12px]">
                    {condition?.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt
                  size={20}
                  color="#8891B2"
                  className="sm:block hidden"
                />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-[12px]">
                    Year
                  </p>
                  <p className="text-[#696E9D] sm:text-sm text-[12px]">
                    {year}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaCalendarAlt
                  size={20}
                  color="#8891B2"
                  className="sm:block hidden"
                />
                <div>
                  <p className="text-[#11133D] font-medium md:text-base text-[12px]">
                    Hours
                  </p>
                  <p className="text-[#696E9D] sm:text-sm text-[12px]">
                    {hours}
                  </p>
                </div>
              </div>
              {/* Add more features as needed */}
            </div>

            {/* Tags */}
            <div className="flex lg:flex-nowrap flex-wrap sm:mt-8 mt-4 gap-4">
              {tags?.map(({ id, name }) => (
                <span
                  key={id}
                  className="bg-[#E0E3FB] sm:text-sm text-[12px] font-semibold text-[#0D1A8B] px-4 py-1 rounded-md"
                >
                  {name}
                </span>
              ))}
            </div>
            <div className="sm:flex hidden items-center justify-end sm:gap-5 gap-4">
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
          className={`flex  sm:items-center sm:mt-8 mt-4 sm:flex-row flex-col ${
            advert_package_id == "3"
              ? "border-t-2 pt-6 pb-3 justify-between"
              : "justify-end"
          }`}
        >
          {advert_package_id == "1" ? (
            ""
          ) : (
            <div className="flex sm:flex-row flex-col gap-8 w-full">
              <div className="flex items-center justify-between">
                <img
                  src={company_logo || image_field || logo}
                  className="border-[1px] max-w-[100px] max-h-10 w-20 object-cover bg-white rounded-lg"
                />
                <div className="sm:hidden flex items-center justify-end sm:gap-5 gap-4">
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
              <div className="w-full">
                <p className="text-[#11133D] font-semibold sm:text-sm text-[13px]">
                  {user_name}
                </p>
                <p className="text-[#8891B2] sm:text-sm capitalize text-[12px] font-medium mb-1">
                  {seller_type}
                </p>
                <p className="flex font-semibold sm:text-sm text-[12px] items-center gap-3 text-[#11133D]">
                  <FaMapMarkedAlt
                    color="#8891B2"
                    className="sm:w-7 sm:h-7 w-5 h-5"
                  />{" "}
                  {city}
                  {city == undefined || null ? "" : ","}{" "}
                  {getCountry(country)?.name}
                </p>
              </div>
            </div>
          )}

          <div
            className={`flex justify-end items-center gap-3 sm:mt-0 mt-3 ${
              advert_package_id == "2" ? "" : "w-full"
            }`}
          >
            <a
              data-tooltip-id="my-tooltip-20"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${email}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd]  sm:w-12 sm:h-12 h-9 w-9 sm:rounded-xl rounded-md flex items-center justify-center"
            >
              <FaEnvelope className="sm:w-6 sm:h-6 h-4 w-4" color="#fff" />
            </a>
            <Tooltip id="my-tooltip-20" place="bottom" content={email} />
            {price_type == "enterInfo" ? (
              <>
                {" "}
                <a
                  data-tooltip-id="my-tooltip-23"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(setIsOfferModalOpen);
                  }}
                  className="bg-[#0D1A8B] hover:bg-[#0a1dbd]  sm:w-12 sm:h-12 h-9 w-9 sm:rounded-xl rounded-md flex items-center justify-center"
                >
                  <FaDollarSign
                    className="sm:w-6 sm:h-6 h-4 w-4"
                    color="#fff"
                  />
                </a>
                <Tooltip
                  id="my-tooltip-23"
                  place="bottom"
                  content="Make Offer"
                />
              </>
            ) : (
              ""
            )}

            <a
              data-tooltip-id="my-tooltip-21"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `tel:${phone_no}`;
              }}
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] sm:w-12 sm:h-12 h-9 w-9 sm:rounded-xl rounded-md flex items-center justify-center"
            >
              <FaPhone className="sm:w-6 sm:h-6 h-4 w-4" color="#fff" />
            </a>
            <Tooltip id="my-tooltip-21" place="bottom" content={phone_no} />
          </div>
        </div>
      </Link>
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => closeModal(setIsOfferModalOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
        width="md:w-9/12 w-full"
      >
        <MakeOfferForm
          initialValues={initialValues}
          handleFormSubmit={handleFormSubmit}
          validationSchema={makeOfferValidationSchema}
          spinner={spinner}
          onClick={() => closeModal(setIsOfferModalOpen)}
        />{" "}
      </Modal>
    </>
  );
};

export default ListingItem;
