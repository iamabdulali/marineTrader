import React, { useContext, useEffect, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { diamondImage, warningIcon } from "../../assets";
import { FaArrowRight } from "react-icons/fa";
import BundlesModal from "./AdComponents/BundlesModal";
import { Link } from "react-router-dom";
import CheckboxGroup from "../CheckboxGroup";
import SpotlightModal from "./SpotlightModal";
import Modal from "../Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import AvailableUpgrades from "./AdComponents/AvailableUpgrades";
import { FormField } from "../FormField";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { tax } from "../../utils/DummyData";
import { AuthContext } from "../../Context/AuthContext";
import SelectDropdown from "../Forms/FormElements/SelectDropdown";

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
  const [priceInfoType, setPriceInfoType] = useState("enterInfo");
  const [loading, setLoading] = useState(true);
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  let [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const [spotlightType, setSpotlightType] = useState(null); // State variable to track spotlight type

  // Other state variables and useEffect as before

  // Function to handle home spotlight click
  const handleHomeSpotlightClick = () => {
    setSpotlightType("home");
  };

  // Function to handle category spotlight click
  const handleCategorySpotlightClick = () => {
    setSpotlightType("category");
  };

  const { currency, taxes } = useContext(AuthContext);

  return (
    <BuildLayout heading="Set Price">
      <div>
        <p className="text-[#11133D] font-semibold border-t-2 pt-4">
          Set Your Price
        </p>
        <div className="flex sm:flex-row flex-col gap-5 mt-5 text-sm ">
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
          <div className="flex mt-5 md:gap-4 gap-0 md:flex-row flex-col">
            <CategorySelectDropdown
              label="Currency"
              name="currency"
              options={currency}
            />
            <FormField
              FieldType="number"
              inputField={true}
              name="price"
              label="Price"
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
            />
            <CategorySelectDropdown label="Tax" name="tax" options={taxes} />
          </div>
        ) : (
          <div className="text-sm mt-5  text-[#11133D] bg-[#FFE8E8] py-7 sm:px-7 px-4 rounded-lg">
            <p className="flex items-center gap-4 text-[#FC4040] font-bold sm:text-xl text-base">
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
          className="flex gap-5 smallLg:flex-nowrap flex-wrap"
          name="facilities"
          facilities={facilities}
          checkedProp={false}
        />
        <div className="mt-6 pt-6 border-t-2">
          <div className="flex items-center justify-between">
            <p className="text-[#0D1A8B] font-semibold capitalize sm:text-lg text-sm">
              Available Upgrades
            </p>
            <button
              onClick={() => openModal(setIsBundleOpen)}
              type="button"
              className="bg-[#0D1A8B] hover:bg-[#0a1dbd] text-sm font-medium text-white py-2 px-4 rounded-md"
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
        <AvailableUpgrades
          className="bg-[#1CBF73] flex smallLg:flex-row flex-col mt-8 p-5 rounded-lg justify-between smallLg:items-center"
          width="smallLg:w-auto"
          openModal={() => openModal(setIsSpotlightOpen)}
          showSpotlight={true}
          handleHomeSpotlightClick={handleHomeSpotlightClick}
          handleCategorySpotlightClick={handleCategorySpotlightClick}
        />
      </div>
      <Modal
        isOpen={isBundleOpen}
        onClose={() => closeModal(setIsBundleOpen)}
        opacity="bg-opacity-40"
        width="xl:w-6/12 w-full"
      >
        <BundlesModal onClick={() => closeModal(setIsBundleOpen)} />
      </Modal>
      <Modal
        isOpen={isSpotlightOpen}
        onClose={() => closeModal(setIsSpotlightOpen)}
        opacity="bg-opacity-40"
        width="xl:w-9/12 w-full"
      >
        <SpotlightModal
          spotlightFor={spotlightType}
          value={values}
          setFieldValue={setFieldValue}
          onClick={() => closeModal(setIsSpotlightOpen)}
        />
      </Modal>
    </BuildLayout>
  );
};

export default PriceStep6;
