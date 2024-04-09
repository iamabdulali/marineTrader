import React, { useContext, useEffect, useState } from "react";
import MakeOfferForm from "../../components/ItemDetailsPage/MakeOfferForm";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiDroplet } from "react-icons/bi";
import { userProfile } from "../../assets";
import {
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaFlag,
  FaHandHoldingUsd,
  FaPhone,
  FaTools,
} from "react-icons/fa";
import ContentToggle from "../../components/ItemDetailsPage/ToggleContent";
import OfferSectionHeader from "./OfferSectionHeader";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { convertTimestampToMonthYear } from "../../utils/TimeStampConverter";
import { AuthContext } from "../../Context/AuthContext";
import { makeOfferValidationSchema } from "../../utils/ValidationSchema";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { GetCountries } from "react-country-state-city/dist/cjs";

const MakeOfferSection = ({ advert }) => {
  const [spinner, setSpinner] = useState(false);
  const [showTiming, setShowTiming] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [cityByStates, setCitiesByStates] = useState([]);

  const { currency_id, advert_package_id, user, id } = Object(advert);
  const {
    image_field,
    created_at,
    name,
    region,
    seller_type,
    facilities,
    user_name,
    city,
    country,
    main_picture,
  } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

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

  const getOptions = async (url, setData) => {
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
    getOptions(
      "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json",
      setStates
    );

    getOptions(
      "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json",
      setCities
    );
  }, []);

  function getCountry(countryName) {
    const country = countries.find((country) => country?.id == countryName);
    return country;
  }

  useEffect(() => {
    setAllStates((prevStates) => {
      const newStates = cities?.reduce((acc, city) => {
        return acc.concat(Object(city)?.states);
      }, []);

      return [...prevStates, ...newStates];
    });
  }, [cities]);

  function getCitiesByStates(stateID) {
    const selectedCities = AllStates?.find((state) => state?.id == stateID);
    setCitiesByStates(selectedCities?.cities);
  }

  function getCity(ID) {
    const city = cityByStates?.find((city) => city?.id == ID);
    return city;
  }

  console.log(created_at);

  useEffect(() => {
    getCitiesByStates(region);
    getCity(city);
  }, [states, countries, AllStates]);

  return (
    <div className="xl:w-4/12 w-full">
      <div className="rounded-lg border-2">
        <div className="hidden sm:block">
          <OfferSectionHeader advert={advert} />
        </div>
        <div className="flex items-center justify-between py-6 sm:px-7 px-4 text-[#696E9D]  border-b-2">
          <p className="text-[#11133D] font-medium sm:text-base text-sm capitalize">
            {user?.seller_type}
          </p>
          <div className="flex items-center sm:gap-5 gap-4">
            <FaHandHoldingUsd data-tooltip-id={"my-tooltip-5"} size={24} />
            <CiDeliveryTruck
              data-tooltip-id={"my-tooltip-6"}
              size={30}
              fill="#696E9D"
            />
            <BiDroplet data-tooltip-id={"my-tooltip-7"} size={20} />
            <FaTools data-tooltip-id={"my-tooltip-8"} size={20} />
          </div>
        </div>
        <Tooltip id="my-tooltip-5" place="bottom" content="Pay Now" />
        <Tooltip id="my-tooltip-6" place="bottom" content="Delivery" />
        <Tooltip id="my-tooltip-7" place="bottom" content="Droplet" />
        <Tooltip id="my-tooltip-8" place="bottom" content="Tools" />
        <div className="flex gap-4 items-center sm:px-7 py-6 px-4">
          <img
            src={image_field || main_picture || userProfile}
            className="rounded-full w-20 h-20 object-cover"
          />
          <div>
            <p className="text-[#11133D] font-semibold">{user_name}</p>
            <p className="text-sm text-[#696E9D]">
              Member Since {convertTimestampToMonthYear(created_at)}
            </p>
            <p className="text-[#11133D] font-semibold text-sm">
              {getCity(city)?.name} , {getCountry(country)?.name}
            </p>
          </div>
        </div>
        <p className="sm:px-7 px-4 py-6 bg-[#B6BDD7] bg-opacity-20 text-[#11133D] font-semibold text-xl ">
          Make An Offer
        </p>
        <div className="sm:px-7 py-6 px-4">
          <MakeOfferForm
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
            validationSchema={makeOfferValidationSchema}
            spinner={spinner}
          />
        </div>
      </div>
      {!isPrivateSeller ? (
        <>
          {" "}
          {/* <div className="rounded-lg border-2 mt-5">
            <ContentToggle
              className="flex justify-between cursor-pointer items-center py-6 px-7"
              title="Opening Times"
              setShowContent={setShowTiming}
              textStyles="font-semibold md:text-xl text-base text-[#11133D]"
              iconSize={24}
            />
            <div className={`pb-5 px-7 ${showTiming ? "block" : "hidden"}`}>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thrusday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => {
                return (
                  <div className="flex justify-between items-center mt-5 text-[#11133D] font-semibold">
                    <p className="sm:text-base text-sm">{day}</p>
                    <p className="sm:text-base text-sm">00:00 AM-10:30 AM</p>
                  </div>
                );
              })}
            </div>
          </div> */}
          {facilities?.length == 0 || facilities?.length == undefined ? (
            ""
          ) : (
            <div className="rounded-lg border-2 mt-5">
              <ContentToggle
                className="flex justify-between cursor-pointer items-center py-6 px-7"
                setShowContent={setShowFacilities}
                title="Facilities"
                textStyles="font-semibold md:text-xl text-base text-[#11133D]"
                iconSize={24}
              />
              <div
                className={`pb-5 px-7 ${
                  showFacilities ? "block" : "hidden"
                } grid grid-cols-2`}
              >
                {facilities?.map((day) => {
                  return (
                    <div className=" mt-5 text-[#11133D] font-semibold">
                      <div className="flex items-center gap-5">
                        <span className="h-2 w-2 rounded-full bg-[#0D1A8B]"></span>
                        <p className="sm:text-base text-sm">{day}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MakeOfferSection;
