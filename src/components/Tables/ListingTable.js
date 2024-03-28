import React, { useState } from "react";
import { FiSearch, FiEye, FiMoreVertical } from "react-icons/fi";
import SortDropdown from "../SortDropdown";
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
import { FaCheck, FaDollarSign, FaTimes } from "react-icons/fa";
import { SERVER_BASE_URL, categoriesList } from "../..";
import axios from "axios";
import { toast } from "react-toastify";

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
  listingData,
  sellingData,
  OffersData,
  onDelete,
}) => {
  let [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [counterOfferId, setCounterOfferId] = useState(null);
  const [deleteAdvertId, setDeleteAdvertId] = useState(null);
  // Callback function to update isDeleteModalOpen state
  const handleDeleteModalOpen = (isOpen) => {
    setIsDeleteModalOpen(isOpen);
  };

  const handleOfferStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/offer-status/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
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
                    title,
                    images,
                    category,
                    currency,
                    advert_status,
                    price,
                    expire_date,
                    view,
                  }) => (
                    <tr
                      key={id}
                      className="bg-white border-b-[20px] shadow-[25px] border-[#f6f6f6] text-sm text-[#696E9D]"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link to={`/itemDetails/${id}`}>
                            <img
                              src={images[0].image}
                              alt="Item"
                              className="w-16 h-16 object-cover rounded-lg mr-2"
                            />
                          </Link>
                          <div>
                            <p className="text-[#11133D] font-semibold text-base mb-1">
                              {/* {category.name} */}
                              {title}
                            </p>
                            <p>
                              {currency.symbol}
                              {price}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{expire_date}</td>
                      {/* <td className="py-4 px-4">{packageName}</td> */}
                      <td className="py-4 px-4">{view}</td>
                      <td className="py-4 px-4">
                        <p
                          className={`${
                            advert_status == "paid"
                              ? "bg-[#D6FDEC] text-[#36B37E]"
                              : advert_status == "draft"
                              ? "bg-[#F6F6F6] text-[#8891B2]"
                              : "bg-[#FDD6D6] text-[#FF4545]"
                          }  rounded-2xl text-center py-3 font-medium`}
                        >
                          {advert_status == "draft"
                            ? "In Draft"
                            : advert_status == "paid"
                            ? "Active"
                            : ""}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex font-semibold items-center justify-center">
                          <Link
                            to={
                              advert_status == "draft"
                                ? `/payment/advert/${id}`
                                : "/"
                            }
                            className={` ${
                              advert_status == "draft"
                                ? "text-[#0D1A8B] border-2 border-[#0D1A8B] hover:bg-[#0D1A8B] hover:text-white"
                                : advert_status == "paid"
                                ? "text-[#FFB800] border-2 border-[#FFB800] hover:bg-[#FFB800] hover:text-white"
                                : "text-[#2AD18A] border-2 border-[#2AD18A] hover:bg-[#2AD18A] hover:text-white"
                            } px-3 py-3 min-w-24 text-sm rounded-md block text-center`}
                          >
                            {advert_status == "draft"
                              ? "Pay Now"
                              : advert_status == "paid"
                              ? "Upgrade"
                              : ""}
                          </Link>
                        </div>
                      </td>
                      <td>
                        <CustomDropdownMenu
                          buttonToOpenMenu={
                            <FiMoreVertical
                              onClick={() => setDeleteAdvertId(id)}
                              size={20}
                              cursor="pointer"
                              color="#0D1A8B"
                            />
                          }
                          children={
                            <ListingMenu
                              openDeleteModal={handleDeleteModalOpen}
                              id={id}
                            />
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <div className="smallLg:hidden grid gap-4">
                {sellingData.map(
                  ({
                    id,
                    images,
                    category,
                    title,
                    currency,
                    price,
                    expire_date,
                    advert_status,
                    view,
                  }) => (
                    <div
                      key={id}
                      className="bg-white sm:text-base text-sm block rounded-lg sm:flex gap-4 w-full p-4"
                    >
                      <Link to={`/itemDetails/${id}`}>
                        <img
                          src={images[0]?.image}
                          alt="Item"
                          className="sm:w-4/12 smallLg:max-h-[auto] max-h-[250px]  w-full object-cover rounded-lg sm:mr-2 mb-4"
                        />
                      </Link>
                      <div className="sm:w-8/12 w-full">
                        <p className="text-[#11133D] font-semibold text-xl mb-2">
                          {/* {category?.name} */}
                          {title}
                        </p>
                        <p className="text-[#8891B2] font-medium">
                          Price:
                          <span className="text-[#696E9D] font-semibold">
                            {currency?.symbol}
                            {price}
                          </span>
                        </p>
                        <p className="text-[#8891B2] font-medium mt-4">
                          {" "}
                          Ad Expires Date:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {expire_date}
                          </span>
                        </p>
                        {/* <td className="py-4 px-4">{packageName}</td> */}
                        <p className="text-[#8891B2] font-medium mt-2">
                          Views:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {" "}
                            {view}
                          </span>
                        </p>
                        <p className="text-[#8891B2] font-medium mt-2">
                          Status:
                          <span
                            className={`${
                              advert_status == "paid"
                                ? "bg-[#D6FDEC] text-[#36B37E]"
                                : advert_status == "draft"
                                ? "bg-[#F6F6F6] text-[#8891B2]"
                                : "bg-[#FDD6D6] text-[#FF4545]"
                            }  rounded-2xl text-center ml-1 px-5 py-2 inline-block text-[#696E9D] font-semibold`}
                          >
                            {" "}
                            {advert_status == "draft" ? "In Draft" : "Active"}
                          </span>
                        </p>
                        <div className="flex mt-5 font-semibold items-center justify-center">
                          <Link
                            to={
                              advert_status == "draft"
                                ? `/payment/advert/${id}`
                                : "/"
                            }
                            className={` ${
                              advert_status == "draft"
                                ? "text-[#0D1A8B] border-2 border-[#0D1A8B] hover:bg-[#0D1A8B] hover:text-white"
                                : advert_status == "paid"
                                ? "text-[#FFB800] border-2 border-[#FFB800]  hover:bg-[#FFB800] hover:text-white"
                                : "text-[#2AD18A] border-2 border-[#2AD18A] hover:bg-[#2AD18A] hover:text-white"
                            } px-3 py-3 min-w-24 text-sm rounded-md block text-center w-full`}
                          >
                            {advert_status == "draft" ? "Pay Now" : "Upgrade"}
                          </Link>
                          <CustomDropdownMenu
                            buttonToOpenMenu={
                              <FiMoreVertical
                                onClick={() => setDeleteAdvertId(id)}
                                size={24}
                                cursor="pointer"
                                color="#0D1A8B"
                              />
                            }
                            children={
                              <ListingMenu
                                openDeleteModal={handleDeleteModalOpen}
                                id={id}
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
            <>
              <tbody className="smallLg:table-row-group hidden">
                {OffersData.map(
                  ({
                    id,
                    offer,
                    name,
                    advert,
                    phone,
                    email,
                    currency,
                    status,
                  }) => (
                    <tr
                      key={id}
                      className="bg-white border-b-[20px] shadow-[25px] border-[#f6f6f6] text-sm text-[#696E9D]"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={advert?.images[0]?.image}
                            alt="Item"
                            className="w-16 h-16 object-cover rounded-lg mr-2"
                          />
                          <div>
                            <p className="text-[#11133D] font-semibold text-base mb-1">
                              {categoriesList[advert?.category_id]}
                            </p>
                            <p>
                              {currency?.symbol}
                              {advert?.price}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{name}</td>
                      <td className="py-4 px-4">{email}</td>
                      <td className="py-4 px-4">{phone}</td>
                      <td className="py-4 px-4">
                        <p className="font-semibold ">
                          {currency?.symbol}
                          {offer}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3 font-semibold items-center justify-center">
                          {status == "accepted" ? (
                            <button
                              disabled={status != "pending" ? true : false}
                              onClick={() => {
                                handleOfferStatus(id, "accepted");
                                setDeleteAdvertId(id);
                              }}
                              className="bg-[#36B37E] flex items-center justify-center w-9 h-9 text-white rounded-full"
                            >
                              <FaCheck />
                            </button>
                          ) : (
                            ""
                          )}

                          {status == "rejected" ? (
                            <button
                              disabled={status != "pending" ? true : false}
                              onClick={() => {
                                handleOfferStatus(id, "rejected");
                                setDeleteAdvertId(id);
                              }}
                              className="bg-[#FF4A6B] flex items-center justify-center w-9 h-9 text-white rounded-full"
                            >
                              <FaTimes />
                            </button>
                          ) : (
                            ""
                          )}
                          {status == "pending" ? (
                            <div className="flex gap-3 font-semibold items-center justify-cente">
                              <button
                                disabled={status != "pending" ? true : false}
                                onClick={() => {
                                  handleOfferStatus(id, "accepted");
                                  setDeleteAdvertId(id);
                                }}
                                className="bg-[#36B37E] flex items-center justify-center w-9 h-9 text-white rounded-full"
                              >
                                <FaCheck />
                              </button>
                              <button
                                disabled={status != "pending" ? true : false}
                                onClick={() => {
                                  handleOfferStatus(id, "rejected");
                                  setDeleteAdvertId(id);
                                }}
                                className="bg-[#FF4A6B] flex items-center justify-center w-9 h-9 text-white rounded-full"
                              >
                                <FaTimes />
                              </button>
                              <button
                                onClick={() => {
                                  openModal(setIsOfferOpen);
                                  setCounterOfferId(id);
                                }}
                                className="bg-[#FFB800] flex items-center justify-center w-9 h-9 text-white rounded-full"
                              >
                                <FaDollarSign />
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <div className="smallLg:hidden grid gap-4">
                {OffersData.map(
                  ({
                    id,
                    offer,
                    advert,
                    name,
                    phone,
                    email,
                    currency,
                    status,
                  }) => (
                    <div
                      key={id}
                      className="bg-white sm:text-base text-sm block rounded-lg sm:flex gap-4 w-full p-4"
                    >
                      <img
                        src={advert?.images[0]?.image}
                        alt="Item"
                        className="sm:w-4/12 smallLg:max-h-[auto] max-h-[250px] w-full object-cover rounded-lg sm:mr-2 mb-4"
                      />
                      <div className="sm:w-8/12 w-full">
                        <p className="text-[#11133D] font-semibold text-xl mb-2">
                          {categoriesList[advert?.category_id]}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-[#8891B2] font-medium">
                            Price:
                            <span className="text-[#696E9D] font-semibold">
                              {" "}
                              {currency?.symbol}
                              {advert?.price}
                            </span>
                          </p>
                          <p className="text-[#11133D] font-semibold ">
                            Offer Price:
                            <span className="text-[#11133D] font-semibold">
                              {" "}
                              {currency?.symbol}
                              {offer}
                            </span>
                          </p>
                        </div>
                        <p className="text-[#8891B2] font-medium mt-4">
                          {" "}
                          Buyer Name:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {name}
                          </span>
                        </p>
                        {/* <td className="py-4 px-4">{packageName}</td> */}
                        <p className="text-[#8891B2] font-medium mt-4">
                          Email:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {" "}
                            {email}
                          </span>
                        </p>
                        <p className="text-[#8891B2] font-medium mt-4">
                          Telephone:{" "}
                          <span className="text-[#696E9D] font-semibold">
                            {" "}
                            {phone}
                          </span>
                        </p>
                        <div className="flex gap-3 font-semibold items-center mt-4">
                          <button
                            disabled={status != "pending" ? true : false}
                            onClick={() => {
                              handleOfferStatus(id, "accepted");
                              setDeleteAdvertId(id);
                            }}
                            className="bg-[#36B37E] p-3 rounded-md flex items-center justify-center text-white w-full"
                          >
                            <FaCheck size={20} />
                          </button>
                          <button
                            disabled={status != "pending" ? true : false}
                            onClick={() => {
                              handleOfferStatus(id, "rejected");
                              setDeleteAdvertId(id);
                            }}
                            className="bg-[#FF4A6B] p-3 rounded-md flex items-center justify-center text-white w-full"
                          >
                            <FaTimes size={20} />
                          </button>
                          <button
                            onClick={() => {
                              openModal(setIsOfferOpen);
                              setCounterOfferId(id);
                            }}
                            className="bg-[#FFB800] flex p-3 rounded-md items-center justify-center text-white w-full"
                          >
                            <FaDollarSign size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </table>
      </div>
      <Modal
        isOpen={isOfferOpen}
        onClose={() => closeModal(setIsOfferOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
      >
        <CounterOffer
          id={counterOfferId}
          onClose={() => closeModal(setIsOfferOpen)}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => closeModal(setIsDeleteModalOpen)}
        opacity="bg-opacity-40"
        padding="p-6"
      >
        <DeleteListingModal
          onDelete={onDelete}
          id={deleteAdvertId}
          onClick={() => closeModal(setIsDeleteModalOpen)}
        />
      </Modal>
    </>
  );
};

export default ListingTable;
