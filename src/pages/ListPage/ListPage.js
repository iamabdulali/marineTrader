import React from "react";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import ListingItem from "../../components/ListingItem/ListingItem";
import SearchFilter from "../../components/ListingItem/SearchFilter";

const ListPage = () => {
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
      <div className="px-24">
        <SearchFilter />
        <div className="flex items-center justify-between mb-8">
          <p className="text-2xl text-[#11133D] font-semibold">
            Jet Ski For Sale
          </p>
          <select
            id="sort-dropdown"
            className="border-2  text-sm border-[#C8C8C8] rounded-lg px-5 py-3 text-[#8891B2]"
            name="sortLists"
          >
            <option>Sort By</option>
          </select>
        </div>
        <ListingItem itemData={itemData} />
        <ListingItem itemData={itemData2} />
      </div>
    </BuyerLayout>
  );
};

export default ListPage;
