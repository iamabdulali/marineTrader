import React, { useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { diamondImage, warningIcon } from "../../assets";
import { FaArrowRight } from "react-icons/fa";
import BundlesModal from "./BundlesModal";
import { Link } from "react-router-dom";
import CheckboxGroup from "../CheckboxGroup";
import SpotlightModal from "./SpotlightModal";

const PriceStep6 = ({ setFieldValue, values }) => {
  const initialFacilities = {
    facilities: {
      "Finance Available": false,
      Warranty: false,
      "Water Test Available": false,
      "Part Exchange Available": false,
    },
  };

  const [facilities, setFacilities] = useState(initialFacilities.facilities);
  const [showModal, setShowModal] = useState(false);
  const [showSpotlightModal, setShowSpotlightModal] = useState(false);
  const [priceInfoType, setPriceInfoType] = useState("enterInfo");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowSpotlightModal = () => {
    setShowSpotlightModal(true);
  };

  return (
    <BuildLayout heading="Set Price">
      <div>
        <p className="text-[#11133D] font-semibold border-t-2 pt-4">
          Set Your Price
        </p>
        <div className="flex mt-5 text-sm">
          <div className="radio">
            <Field
              name="priceOnInformation"
              id="priceInfoRadio"
              type="radio"
              value="enterInfo"
              checked={priceInfoType === "enterInfo"}
              onChange={() => setPriceInfoType("enterInfo")}
            />
            <label htmlFor="priceInfoRadio" className="radio-label mr-5 ">
              Enter Pricing information
            </label>
          </div>

          <div className="radio">
            <Field
              name="priceOnInformation"
              id="poa"
              type="radio"
              value="poa"
              checked={priceInfoType === "poa"}
              onChange={() => setPriceInfoType("poa")}
            />
            <label htmlFor="poa" className="radio-label">
              POA (Price on Application)
            </label>
          </div>
        </div>
        {priceInfoType === "enterInfo" ? (
          <div className="flex mt-5 gap-4">
            <CategorySelectDropdown
              label="Currency"
              name="currency"
              options={["currency1", "currency2", "currency3"]}
            />
            <CategorySelectDropdown
              label="Price"
              name="price"
              options={["Price1", "Price2", "Price3"]}
            />
          </div>
        ) : (
          <div className="text-sm mt-5  text-[#11133D] bg-[#FFE8E8] py-7 px-7 rounded-lg">
            <p className="flex items-center gap-4 text-[#FC4040] font-bold text-xl">
              <img src={warningIcon} className="w-10" alt="warningIcon" />
              Please Note By Selecting POA:
            </p>
            <p className="mt-3 mb-2">
              May make your item harder to find in the search results
            </p>
            <p>
              On premium and featured ads it will disable the ‘Make an Offer’
              function
            </p>
            <p className="mt-2 w-10/12">
              For the Best results we recommend displaying a price. This makes
              it easier for potential buyers to compare your item with other
              similar displayed adverts – making sales quicker and easier with
              less pointless enquiries.
            </p>
          </div>
        )}

        <CheckboxGroup
          className="flex gap-5"
          name="facilities"
          facilities={facilities}
          checkedProp={false}
        />
        <div className="mt-6 pt-6 border-t-2">
          <div className="flex items-center justify-between">
            <p className="text-[#0D1A8B] font-semibold capitalize text-lg">
              Available Upgrades
            </p>
            <button
              onClick={handleShowModal}
              type="button"
              className="bg-[#0D1A8B] text-sm font-medium text-white py-2 px-4 rounded-md"
            >
              Buy a Bundle
            </button>
          </div>
          <p className="text-sm mt-3">
            <Link className="text-[#0D1A8B] font-semibold underline ">
              UPGRADE
            </Link>{" "}
            to premium or featured package for making your advert highlighted on
            home page and category page
          </p>
        </div>
        <div className="bg-[#1CBF73] flex mt-8 p-5 rounded-lg justify-between items-center ">
          <div className="flex items-center gap-5">
            <img src={diamondImage} alt="diamond" className="w-14" />
            <p className="flex items-center text-white font-semibold">
              Available Upgrades <FaArrowRight className="ml-5" size={20} />
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleShowSpotlightModal}
              type="button"
              className="bg-[#FFB800] text-[#11133D] font-semibold py-3 px-6 rounded-md"
            >
              Home Page Spotlight
            </button>
            <button
              onClick={handleShowSpotlightModal}
              type="button"
              className="bg-white text-[#11133D] font-semibold py-3 px-6 rounded-md"
            >
              Category Page Spotlight
            </button>
          </div>
        </div>
      </div>
      {showModal ? <BundlesModal onClick={() => setShowModal(false)} /> : ""}
      {showSpotlightModal ? (
        <SpotlightModal
          value={values}
          setFieldValue={setFieldValue}
          onClick={() => setShowSpotlightModal(false)}
        />
      ) : (
        ""
      )}
    </BuildLayout>
  );
};

export default PriceStep6;
