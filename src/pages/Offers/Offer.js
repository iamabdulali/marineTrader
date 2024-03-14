import React, { useEffect, useState } from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import { fetchOffers, fetchOptions } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";

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
        <LoadingWrapper
          loading={loading}
          className="top-0 xl:-translate-x-0 -translate-x-1/2"
        >
          <ListingTable
            tableFor="Offers"
            hasSort={true}
            hasPadding={true}
            tableHeader={offersHeader}
            OffersData={offers}
          />
        </LoadingWrapper>
      </Layout>
    </>
  );
}
