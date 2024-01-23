import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";

export default function Offer() {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <Heading content="Offers" />
        </div>

        <ListingTable
          tableFor="Offers"
          hasSort={true}
          hasPadding={true}
          tableHeader={offersHeader}
        />
      </Layout>
    </>
  );
}
