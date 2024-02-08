import React from "react";
import { FiSearch, FiEye, FiMoreVertical } from "react-icons/fi";
import SortDropdown from "../SortDropdown";
import { OffersData, listingData, sellingData } from "../../utils/DummyData";
import { Link } from "react-router-dom";
import CustomDropdownMenu from "../CustomDropdownMenu";
import ListingMenu from "../Selling/ListingMenu";

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
  return (
    <div
      className={`mx-auto ${sidePadding ? "py-8 px-8" : ""} ${
        backgroundWhite ? "bg-white" : ""
      }  mt-5 rounded-xl lg:overflow-hidden overflow-x-scroll`}
    >
      {/* Search Bar */}
      <div
        className={`flex bg-white ${
          hasPadding ? "p-7" : ""
        } rounded-lg shadow-[7px] justify-between items-center mb-4 w-[900px] lg:w-auto`}
      >
        <label htmlFor="search" className="mr-2 text-lg font-bold">
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
      <table className="lg:w-full shadow-[8px] w-[900px]">
        <thead>
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
          <tbody>
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
                      children={<ListingMenu />}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
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
                      <button className="bg-[#FFB800] flex items-center justify-center w-9 h-9 text-white rounded-full">
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
  );
};

export default ListingTable;
