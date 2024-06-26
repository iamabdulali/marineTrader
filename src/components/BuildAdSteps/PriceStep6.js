import React, { useContext, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field, useFormikContext } from "formik";
import { CategorySelectDropdown } from "../CategorySelectDropdown";
import { warningIcon } from "../../assets";
import BundlesModal from "./AdComponents/BundlesModal";
import SpotlightModal from "./SpotlightModal";
import Modal from "../Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import AvailableUpgrades from "./AdComponents/AvailableUpgrades";
import { FormField } from "../FormField";
import { AuthContext } from "../../Context/AuthContext";
import { handlePackageUpgrade } from "../../utils/handlePackageUpgrade";
import { handleInputChange } from "../../utils/handleInputChange";

const PriceStep6 = ({ isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();

  const [facilities, setFacilities] = useState({
    finance_available: false,
    warranty: false,
    water_test_facility: false,
    part_exchange_available: false,
  });

  const { currency, taxes, user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const { advert } = Object(values);
  const {
    price_type,
    currency: advert_currency,
    price,
    tax_id,
  } = Object(advert);

  const [priceInfoType, setPriceInfoType] = useState(
    isEditMode ? price_type : values?.price_type
  );
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

  let numberToSubtract = values?.advert_package > 4 ? 4 : 1;

  let currentPackage = +values?.advert_package - numberToSubtract;

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
              value={"enterInfo"}
              checked={
                isEditMode
                  ? price_type == "enterInfo"
                  : values?.price_type == "enterInfo"
              }
              onChange={(e) => {
                // handleInputChange(e);
                isEditMode
                  ? handleInputChange(
                      e,
                      null,
                      null,
                      "advert",
                      isEditMode,
                      setFieldValue
                    )
                  : handleInputChange(
                      e,
                      null,
                      null,
                      null,
                      isEditMode,
                      setFieldValue
                    );
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
              value={"poa"}
              checked={
                isEditMode ? price_type == "poa" : values?.price_type == "poa"
              }
              onChange={(e) => {
                // handleInputChange(e);
                isEditMode
                  ? handleInputChange(
                      e,
                      null,
                      null,
                      "advert",
                      isEditMode,
                      setFieldValue
                    )
                  : handleInputChange(
                      e,
                      null,
                      null,
                      null,
                      isEditMode,
                      setFieldValue
                    );
                setPriceInfoType("poa");
                setFieldValue("price", "100");
                setFieldValue("currency", "1");
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
              isCurrencyField={true}
              label="Currency"
              name="currency"
              options={currency}
              value={isEditMode ? advert_currency?.id : values?.currency}
              onChange={(e) =>
                isEditMode
                  ? handleInputChange(
                      e,
                      "currency",
                      currency,
                      "advert",
                      isEditMode,
                      setFieldValue
                    )
                  : handleInputChange(
                      e,
                      null,
                      null,
                      null,
                      isEditMode,
                      setFieldValue
                    )
              }
            />
            <FormField
              FieldType="number"
              inputField={true}
              name="price"
              placeholder="Enter Price"
              label="Price"
              value={isEditMode ? price : values?.price}
              className="border-[#CECED7] text-[#8891B2] border-2 rounded-md p-3 w-full"
              onChange={(e) =>
                isEditMode
                  ? handleInputChange(
                      e,
                      null,
                      null,
                      "advert",
                      isEditMode,
                      setFieldValue
                    )
                  : handleInputChange(
                      e,
                      null,
                      null,
                      null,
                      isEditMode,
                      setFieldValue
                    )
              }
            />
            <CategorySelectDropdown
              value={isEditMode ? tax_id : values?.tax_id}
              label="Tax"
              name="tax_id"
              options={taxes}
              onChange={(e) =>
                isEditMode
                  ? handleInputChange(
                      e,
                      null,
                      null,
                      "advert",
                      isEditMode,
                      setFieldValue
                    )
                  : handleInputChange(
                      e,
                      null,
                      null,
                      null,
                      isEditMode,
                      setFieldValue
                    )
              }
            />
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
              { name: "Finance Available", key: "finance_available" },
              { name: "Warranty", key: "warranty" },
              { name: "Water Test Available", key: "water_test_facility" },
              {
                name: "Part Exchange Available",
                key: "part_exchange_available",
              },
            ].map((facility, index) => (
              <div key={index}>
                <label className="flex text-[#11133D]">
                  <Field
                    className={`min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3`}
                    type="checkbox"
                    name={facility.key}
                    checked={
                      isEditMode
                        ? advert[facility.key] === "yes"
                        : values[facility.key] === "yes"
                    }
                    onChange={(e) => {
                      const value = e.target.checked ? "yes" : "no";

                      isEditMode
                        ? setFieldValue(`advert.${facility.key}`, value)
                        : setFieldValue(facility.key, value);
                    }}
                  />
                  {facility.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {!isEditMode && currentPackage != 3 ? (
          <p className="text-sm mt-8">
            <button
              onClick={() => handlePackageUpgrade(values, setFieldValue)}
              type="button"
              className="text-[#0D1A8B] font-semibold underline "
            >
              UPGRADE
            </button>{" "}
            to {currentPackage < 2 ? "Premium or Featured" : "Featured"} Package
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
          isEditMode={isEditMode}
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
