import React, { useEffect, useState } from "react";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import ListingItem from "../../components/ListingItem/ListingItem";
import SearchFilter from "../../components/ListingItem/SearchFilter";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";

const ListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const make = queryParams.get("make");
  const model = queryParams.get("model");
  const type = queryParams.get("type");
  const condition = queryParams.get("condition");
  const year = queryParams.get("year");

  const [searchedListings, setSearchedListings] = useState([]);

  useEffect(() => {
    const searchedListing = async () => {
      try {
        let url = `${SERVER_BASE_URL}?`;
        if (category) url += `category=${category}&`;
        if (make) url += `make=${make}&`;
        if (model) url += `model=${model}&`;
        if (type) url += `type=${type}&`;
        if (condition) url += `condition=${condition}&`;
        if (year) url += `year=${year}&`;

        // Remove the last '&' character if present
        if (url.endsWith("&")) {
          url = url.slice(0, -1);
        }

        console.log(url);

        const { data } = await axios.get(url);
        toast.success(data.message);
        setSearchedListings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    searchedListing();
  }, [category, make, model, type, condition, year]);

  console.log(searchedListings);

  const itemData = {
    heading: "Item Heading",
    description:
      "Pharetra ut nulla urna turpis euismod risus turpis tempor. Orci sed lacus eu nunc nisl at vitae orci. Faucibus fermentum nibh pellentesque orci euismod enim.",
    make: "Yamaha",
    model: "Fzs Svho",
    condition: "Excellent",
    year: 2022,
    hours: 120,
    tags: ["3k Modification", "Lady In Red", "456 Bhp", "Super Charger"],
    featured: false,
  };
  const itemData2 = {
    heading: "Item Heading",
    description:
      "Pharetra ut nulla urna turpis euismod risus turpis tempor. Orci sed lacus eu nunc nisl at vitae orci. Faucibus fermentum nibh pellentesque orci euismod enim.",
    make: "Yamaha",
    model: "Fzs Svho",
    condition: "Excellent",
    year: 2022,
    hours: 120,
    tags: ["3k Modification", "Lady In Red", "456 Bhp", "Super Charger"],
    featured: true,
    sellerInfo: true,
  };
  return (
    <BuyerLayout showCategoryList={true}>
      <div className="2xl:px-24 sm:px-10 px-4">
        <SearchFilter />
        <div className="flex items-center justify-between mb-8">
          <p className="md:text-2xl text-xl text-[#11133D] font-semibold">
            Jet Ski For Sale
          </p>
          <select
            id="sort-dropdown"
            className="border-2 hover:bg-[#8891B2] hover:text-white hover:border-[#8891B2] text-sm border-[#C8C8C8] rounded-lg md:px-5 md:py-3 px-3 py-2 text-[#8891B2]"
            name="sortLists"
          >
            <option>Sort By</option>
          </select>
        </div>

        {searchedListings.length == 0 ? <div>No Listing Found</div> : ""}

        {searchedListings?.map((listing) => {
          return <ListingItem itemData={listing} />;
        })}
      </div>
    </BuyerLayout>
  );
};

export default ListPage;
