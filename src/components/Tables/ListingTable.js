import React, { useState } from "react";
import { FiSearch, FiEye, FiMoreVertical } from "react-icons/fi";
import SortDropdown from "../SortDropdown";
import { OffersData, listingData, sellingData } from "../../utils/DummyData";
import { Link } from "react-router-dom";
import CustomDropdownMenu from "../CustomDropdownMenu";
import ListingMenu from "../Selling/ListingMenu";
import Modal from "../Modal";
import CounterOffer from "../Offers/CounterOffer";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import DeleteListingModal from "../Selling/DeleteListingModal";

const ListingTable = ({
  hasSort,
  hasSearch,
  backgroundWhite,
  hasPadding,
  sidePadding,
  tableHeader,
  dashboardListing,
  sellingListing,
  tableFor,
}) => {
  let [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Callback function to update isDeleteModalOpen state
  const handleDeleteModalOpen = (isOpen) => {
    setIsDeleteModalOpen(isOpen);
  };

  return (
    <>
      <div
        className={`mx-auto ${sidePadding ? "py-8 px-8" : ""} ${
          backgroundWhite ? "bg-white" : ""
        }  mt-5 rounded-xl `}
      >
        {/* Search Bar */}
        <div
          className={`flex bg-white ${
            hasPadding ? "sm:p-7 py-7 px-3" : ""
          } rounded-lg shadow-[7px] justify-between items-center mb-4 `}
        >
          <label
            htmlFor="search"
            className="mr-2 sm:text-lg text-base font-bold"
          >
            {tableFor}
          </label>
          {hasSearch ? (
            <div className="relative w-80">
              <input
                type="text"
                id="search"
                placeholder="Search Item"
                className="px-4 py-4 bg-[#f8f8f8] w-full text-sm text-[#8E95A9B2] rounded-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch />
              </div>
            </div>
          ) : (
            ""
          )}

          {hasSort ? <SortDropdown /> : ""}
        </div>

        {/* Table */}
        <table className="w-full shadow-[8px] ">
          <thead className="smallLg:table-row-group hidden">
            <tr className="bg-[#f8f8f8] text-[#8891B2] text-left py-4">
              {tableHeader.map(({ text, id, textCenter }) => (
                <th
                  key={id}
                  className={`py-4 px-4 rounded-tl-xl font-medium text-sm ${
                    textCenter ? "text-center" : "text-left"
                  }`}
                >
                  {text}
                </th>
              ))}
            </tr>
          </thead>
          {dashboardListing ? (
            <tbody>
              {/* Map through the array to dynamically render rows */}
              {listingData.map(
                ({ id, image, itemName, status, price, listedDate }) => (
                  <tr
                    key={id}
                    className="border-b-2  border-[#f8f8f8] text-sm text-[#696E9D]"
                  >
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={image}
                          alt="Item"
                          className="w-16 h-16 object-cover rounded-lg mr-2"
                        />
                        <p>{itemName}</p>
                      </div>
                    </td>
                    <td className="py-2 px-4">{price}</td>
                    <td className="py-2 px-4">{listedDate}</td>
                    <td className="py-2 px-4">
                      <p
                        className={`${
                          status == "Active"
                            ? "bg-[#D6FDEC] text-[#36B37E]"
                            : "bg-[#DFE8FF] text-[#2E52B2]"
                        }  rounded-2xl text-center py-3 font-medium`}
                      >
                        {status}
                      </p>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex font-semibold items-center justify-center">
                        <FiEye color="#0D1A8B" />
                        <button className="text-[#0D1A8B] px-2 py-1 rounded-lg">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : sellingListing ? (
            <>
              <tbody className="smallLg:table-row-group hidden">
                {/* Map through the array to dynamically render rows */}
                {sellingData.map(
                  ({
                    id,
                    image,
                    itemName,
                    status,
                    price,
                    adExpireDate,
                    packageName,
                    views,
                    ad,
                  }) => (
                    <tr
                      key={id}
                      className="bg-white border-b-[20px] shadow-[25px] border-[#f6f6f6] text-sm text-[#696E9D]"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={image}
                            alt="Item"
                            className="w-16 h-16 object-cover rounded-lg mr-2"
                          />
                          <div>
                            <p className="text-[#11133D] font-semibold text-base mb-1">
                              {itemName}
                            </p>
                            <p>{price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{adExpireDate}</td>
                      {/* <td className="py-4 px-4">{packageName}</td> */}
                      <td className="py-4 px-4">{views}</td>
                      <td className="py-4 px-4">
                        <p
                          className={`${
                            status == "Active"
                              ? "bg-[#D6FDEC] text-[#36B37E]"
                              : status == "In Draft"
                              ? "bg-[#F6F6F6] text-[#8891B2]"
                              : "bg-[#FDD6D6] text-[#FF4545]"
                          }  rounded-2xl text-center py-3 font-medium`}
                        >
                          {status}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex font-semibold items-center justify-center">
                          <Link
                            to={ad == "Edit" ? "/selling/buildAd" : "/"}
                            className={` ${
                              ad == "Edit"
                                ? "text-[#0D1A8B] border-2 border-[#0D1A8B]"
                                : ad == "Upgrade"
                                ? "text-[#FFB800] border-2 border-[#FFB800]"
                                : "text-[#2AD18A] border-2 border-[#2AD18A]"
                            } px-3 py-3 min-w-24 text-sm rounded-md block text-center`}
                          >
                            {ad}
                          </Link>
                        </div>
                      </td>
                      <td>
                        <CustomDropdownMenu
                          buttonToOpenMenu={
                            <FiMoreVertical
                              size={20}
                              cursor="pointer"
                              color="#0D1A8B"
                            />
                          }
                          children={
                            <ListingMenu
                              openDeleteModal={handleDeleteModalOpen}
                            />
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <div className="smallLg:hidden grid  gap-4">
                {sellingData.map(
                  ({
                    id,
                    image,
                    itemName,
                    status,
                    price,
                    adExpireDate,
                    packageName,
                    views,
                    ad,
                  }) => (
                    <div className="bg-white sm:text-base text-sm block rounded-lg sm:flex gap-4 w-full p-4">
                      <img
                        src={image}
                        alt="Item"
                        className="sm:w-4/12 w-full object-cover rounded-lg sm:mr-2 mb-4"
                      />
                      <div className="sm:w-8/12 w-full">
                        <p className="text-[#11133D] font-semibold text-xl mb-2">
                          {itemName}
                        </p>
                        <p className="text-[#8891B2] font-medium">
                          Price:
                          <span className="text-[#696E9D] font-semibold">
                            {" "}
                            {price}
                          </span>
                        </p>
                        <p className="text-[#8891B2] font-medium mt-2">
                          {" "}
                          Ad Expires Date:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {adExpireDate}
                          </span>
                        </p>
                        {/* <td className="py-4 px-4">{packageName}</td> */}
                        <p className="text-[#8891B2] font-medium mt-2">
                          Views:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {" "}
                            {views}
                          </span>
                        </p>
                        <p className="text-[#8891B2] font-medium mt-2">
                          Status:
                          <span
                            className={`${
                              status == "Active"
                                ? "bg-[#D6FDEC] text-[#36B37E]"
                                : status == "In Draft"
                                ? "bg-[#F6F6F6] text-[#8891B2]"
                                : "bg-[#FDD6D6] text-[#FF4545]"
                            }  rounded-2xl text-center ml-1 px-5 py-2 inline-block text-[#696E9D] font-semibold`}
                          >
                            {" "}
                            {status}
                          </span>
                        </p>
                        <div className="flex mt-5 font-semibold items-center justify-center">
                          <Link
                            to={ad == "Edit" ? "/selling/buildAd" : "/"}
                            className={` ${
                              ad == "Edit"
                                ? "text-[#0D1A8B] border-2 border-[#0D1A8B]"
                                : ad == "Upgrade"
                                ? "text-[#FFB800] border-2 border-[#FFB800]"
                                : "text-[#2AD18A] border-2 border-[#2AD18A]"
                            } px-3 py-3 min-w-24 text-sm rounded-md block text-center w-full`}
                          >
                            {ad}
                          </Link>
                          <CustomDropdownMenu
                            buttonToOpenMenu={
                              <FiMoreVertical
                                size={24}
                                cursor="pointer"
                                color="#0D1A8B"
                              />
                            }
                            children={
                              <ListingMenu
                                openDeleteModal={handleDeleteModalOpen}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <tbody>
              {/* Map through the array to dynamically render rows */}
              {OffersData.map(
                ({
                  id,
                  image,
                  itemName,
                  accept,
                  reject,
                  offerAmount,
                  price,
                  buyerName,
                  telephone,
                  email,
                  counterOffer,
                }) => (
                  <tr
                    key={id}
                    className="bg-white border-b-[20px] shadow-[25px] border-[#f6f6f6] text-sm text-[#696E9D]"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={image}
                          alt="Item"
                          className="w-16 h-16 object-cover rounded-lg mr-2"
                        />
                        <div>
                          <p className="text-[#11133D] font-semibold text-base mb-1">
                            {itemName}
                          </p>
                          <p>{price}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{buyerName}</td>
                    <td className="py-4 px-4">{email}</td>
                    <td className="py-4 px-4">{telephone}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold">{offerAmount}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-3 font-semibold items-center justify-center">
                        <button className="bg-[#36B37E] flex items-center justify-center w-9 h-9 text-white rounded-full">
                          {accept}
                        </button>
                        <button className="bg-[#FF4A6B] flex items-center justify-center w-9 h-9 text-white rounded-full">
                          {reject}
                        </button>
                        <button
                          onClick={() => openModal(setIsOfferOpen)}
                          className="bg-[#FFB800] flex items-center justify-center w-9 h-9 text-white rounded-full"
                        >
                          {counterOffer}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </table>
      </div>
      <Modal
        isOpen={isOfferOpen}
        onClose={() => closeModal(setIsOfferOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
      >
        <CounterOffer onClose={() => closeModal(setIsOfferOpen)} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => closeModal(setIsDeleteModalOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
      >
        <DeleteListingModal onClick={() => closeModal(setIsDeleteModalOpen)} />
      </Modal>
    </>
  );
};

export default ListingTable;
