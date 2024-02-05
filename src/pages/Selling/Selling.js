import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import SortDropdown from "../../components/SortDropdown";
import { sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";

export default function Selling() {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <Heading content="Selling" />
          <Link
            to={"/selling/adsubscription"}
            className="flex items-center text-sm gap-2 bg-[#0D1A8B] text-white py-3 px-5 font-medium rounded-md"
          >
            <FaPlus size={15} /> Create New Listing
          </Link>
        </div>

        <CategoryList
          className="flex lg:w-full min-h-[80px] mt-5 justify-between px-4 bg-white border-2 rounded-lg border-[#D9DFF5] w-[1300px]"
          activeCategory="border-b-4 border-[#0D1A8B] py-3"
          unActiveCategory="py-3"
          onCategoryChange={() => {}}
          onCategoryClick={() => {}}
        />

        <ListingTable
          tableFor="Your Listings"
          hasSort={true}
          hasPadding={true}
          sellingListing={true}
          tableHeader={sellingHeader}
        />
      </Layout>
    </>
  );
}
