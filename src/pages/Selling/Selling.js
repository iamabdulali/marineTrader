import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import SortDropdown from "../../components/SortDropdown";
import { sellingHeader } from "../../utils/DummyData";

export default function Selling() {
  return (
    <>
      <div className="bg-[#f6f6f6] min-h-screen">
        <Header />
        <VerticalMenu />
        <div className="ml-72 py-8 px-8">
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
            hasSort={true}
            hasPadding={true}
            tableHeader={sellingHeader}
          />
        </div>
      </div>
    </>
  );
}
