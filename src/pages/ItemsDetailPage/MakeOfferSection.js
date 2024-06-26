import React, { useEffect, useState } from "react";
import MakeOfferForm from "../../components/ItemDetailsPage/MakeOfferForm";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiDroplet } from "react-icons/bi";
import { userProfile } from "../../assets";
import { FaHandHoldingUsd, FaTools } from "react-icons/fa";
import ContentToggle from "../../components/ItemDetailsPage/ToggleContent";
import OfferSectionHeader from "./OfferSectionHeader";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { convertTimestampToMonthYear } from "../../utils/TimeStampConverter";
import { makeOfferValidationSchema } from "../../utils/ValidationSchema";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { GetCountries } from "react-country-state-city/dist/cjs";

const MakeOfferSection = ({ advert }) => {
  const [spinner, setSpinner] = useState(false);
  const [showFacilities, setShowFacilities] = useState(true);
  const [countries, setCountries] = useState([]);

  const {
    currency_id,
    user,
    id,
    finance_available,
    warranty,
    water_test_facility,
    part_exchange_available,
    advert_status,
  } = Object(advert);

  const {
    image_field,
    created_at,
    seller_type,
    facilities,
    user_name,
    city,
    calling_code,
    country,
    main_picture,
    email,
    phone_no,
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
    if (advert_status == "paid") {
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
    } else {
      toast.error("You have to pay for advert in order to create offer");
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
  }, []);

  function getCountry(countryName) {
    const country = countries.find((country) => country?.id == countryName);
    return country;
  }

  return (
    <div className="xl:w-4/12 w-full">
      <div className="rounded-lg border-2">
        <div className="hidden sm:block">
          <OfferSectionHeader
            phone_no={phone_no}
            email={email}
            calling_code={calling_code}
            advert={advert}
          />
        </div>

        <Tooltip id="my-tooltip-5" place="bottom" content="Finance" />
        <Tooltip id="my-tooltip-6" place="bottom" content="Warrenty" />
        <Tooltip
          id="my-tooltip-7"
          place="bottom"
          content="Water Test Facility"
        />
        <Tooltip id="my-tooltip-8" place="bottom" content="Part Exchange" />

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
              {city}, {getCountry(country)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pb-6 sm:px-7 px-4 text-[#696E9D] ">
          <p className="text-[#11133D] font-medium sm:text-base text-sm capitalize">
            {user?.seller_type}
          </p>
          <div className="flex items-center sm:gap-5 gap-4">
            {/* finance_available */}
            {finance_available == "yes" ? (
              <FaHandHoldingUsd data-tooltip-id={"my-tooltip-5"} size={24} />
            ) : (
              ""
            )}

            {warranty == "yes" ? (
              <CiDeliveryTruck
                data-tooltip-id={"my-tooltip-6"}
                size={30}
                fill="#696E9D"
              />
            ) : (
              ""
            )}
            {water_test_facility == "yes" ? (
              <BiDroplet data-tooltip-id={"my-tooltip-7"} size={20} />
            ) : (
              ""
            )}
            {part_exchange_available == "yes" ? (
              <FaTools data-tooltip-id={"my-tooltip-8"} size={20} />
            ) : (
              ""
            )}
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
            advertStatus={advert_status}
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
