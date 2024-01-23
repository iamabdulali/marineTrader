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

export default function Selling() {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <Heading content="Selling" />
          <Link
            to={"/adsubscription"}
            className="flex items-center text-sm gap-2 bg-[#0D1A8B] text-white py-3 px-5 font-medium rounded-md"
          >
            <FaPlus size={15} /> Create New Listing
          </Link>
        </div>

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
