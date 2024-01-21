import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";

export default function Offer() {
  return (
    <>
      <div className="bg-[#f6f6f6] min-h-screen">
        <Header />
        <VerticalMenu />
        <div className="ml-72 py-8 px-8">
          <div className="flex items-center justify-between">
            <Heading content="Offers" />
          </div>

          <ListingTable
            tableFor="Offers"
            hasSort={true}
            hasPadding={true}
            tableHeader={offersHeader}
          />
        </div>
      </div>
    </>
  );
}
