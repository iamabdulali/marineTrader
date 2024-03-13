import React, { useEffect, useState } from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import { fetchOffers, fetchOptions } from "../../utils/fetch/fetchData";

export default function Offer() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOffers(setOffers, setLoading);
  }, []);
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
          OffersData={offers}
        />
      </Layout>
    </>
  );
}
