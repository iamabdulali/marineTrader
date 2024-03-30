import React, { useContext, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field, useFormikContext } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { warningIcon } from "../../assets";
import BundlesModal from "./AdComponents/BundlesModal";
import { Link } from "react-router-dom";
import SpotlightModal from "./SpotlightModal";
import Modal from "../Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import AvailableUpgrades from "./AdComponents/AvailableUpgrades";
import { FormField } from "../FormField";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { handlePackageUpgrade } from "../../utils/handlePackageUpgrade";

const PriceStep6 = () => {
  const [priceInfoType, setPriceInfoType] = useState("enterInfo");
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  let [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const [spotlightType, setSpotlightType] = useState(null);

  // Function to handle home spotlight click
  const handleHomeSpotlightClick = () => {
    setSpotlightType("home");
  };

  // Function to handle category spotlight click
  const handleCategorySpotlightClick = () => {
    setSpotlightType("category");
  };

  const { values, setFieldValue } = useFormikContext();

  const { currency, taxes, user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <BuildLayout heading="Set Price">
      <div>
        <p className="text-[#11133D] font-semibold border-t-2 pt-4">
          Set Your Price
        </p>
        <div className="flex sm:flex-row flex-col gap-5 mt-5 text-sm ">
          <div className="radio">
            <Field
              name="price_type"
              id="priceInfoRadio"
              type="radio"
              value="enterInfo"
              checked={values?.price_type == "enterInfo"}
              onChange={(e) => {
                handleInputChange(e);
                setPriceInfoType("enterInfo");
              }}
            />
            <label htmlFor="priceInfoRadio" className="radio-label mr-5 ">
              Enter Pricing information
            </label>
          </div>
          <div className="radio">
            <Field
              name="price_type"
              id="poa"
              type="radio"
              value="poa"
              checked={values?.price_type == "poa"}
              onChange={(e) => {
                handleInputChange(e);
                setPriceInfoType("poa");
              }}
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
          <div className="text-sm mt-5 mb-6  text-[#11133D] bg-[#FFE8E8] py-7 sm:px-7 px-4 rounded-lg">
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

        {!isPrivateSeller ? (
          <div className="flex gap-5 smallLg:flex-nowrap flex-wrap text-sm font-medium">
            {[
              "Finance Available",
              "Warranty",
              "Water Test Available",
              "Part Exchange Available",
            ].map((facility, index) => {
              return (
                <div key={index}>
                  <label className="flex text-[#11133D]">
                    <Field
                      className="min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                      type="checkbox"
                      name={`facilities`}
                      value={`${facility}`}
                    />
                    {facility}
                  </label>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}

        {(!isPrivateSeller && values?.advert_package == "5") ||
        values?.advert_package == "6" ? (
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
          </div>
        ) : (
          ""
        )}

        {values?.advert_package == 3 || values?.advert_package != 6 ? (
          <p className="text-sm mt-8">
            <button
              onClick={() =>
                handlePackageUpgrade(values, setFieldValue, seller_type)
              }
              type="button"
              className="text-[#0D1A8B] font-semibold underline "
            >
              UPGRADE
            </button>{" "}
            to Premium or Featured Package
          </p>
        ) : (
          ""
        )}

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
