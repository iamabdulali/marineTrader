import React from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { jetski2, jetski3d } from "../../assets";

const ListingTable = () => {
  // Sample data array of objects
  const listingData = [
    {
      id: 1,
      itemName: "Jet Ski Pro 4000",
      price: "$19.99",
      listedDate: "2024-01-19",
      status: "Active",
      image: jetski2,
    },
    {
      id: 2,
      itemName: "Jet Ski 6X",
      price: "$19.99",
      listedDate: "2024-01-19",
      status: "Sold",
      image: jetski3d,
    },
    {
      id: 3,
      itemName: "Jet Ski Pro 9000",
      price: "$19.99",
      listedDate: "2024-01-19",
      status: "Active",
      image: jetski2,
    },
    // Add more objects as needed
  ];

  return (
    <div className="mx-auto py-8 px-8 bg-white mt-5 rounded-xl">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="search" className="mr-2 text-lg font-bold">
          Your Listings
        </label>
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
      </div>

      {/* Table */}
      <table className="w-full shadow-[8px]">
        <thead>
          <tr className="bg-[#f8f8f8] text-[#8891B2] text-left py-4">
            <th className="py-4 px-4 rounded-tl-xl font-medium text-sm">
              Item
            </th>
            <th className="py-4 px-4 font-medium text-sm">Price</th>
            <th className="py-4 px-4 font-medium text-sm">Listed Date</th>
            <th className="py-4 px-4 font-medium text-sm text-center">
              Status
            </th>
            <th className="py-4 px-4 rounded-tr-xl font-medium text-sm text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the array to dynamically render rows */}
          {listingData.map(
            ({ id, image, itemName, status, price, listedDate }) => (
              <tr
                key={id}
                className="border-b-2 border-[#f8f8f8] text-sm text-[#696E9D]"
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
      </table>
    </div>
  );
};

export default ListingTable;
