import React, { useEffect, useState } from "react";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import { fetchOffers } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { ref } from "yup";

export default function Offer() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchOffers(setOffers, setLoading);
  }, [refresh]);
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
          {offers.length == 0 ? (
            <p className=" w-full text-center font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No Offers At The Moment
            </p>
          ) : (
            <ListingTable
              tableFor="Offers"
              hasSort={true}
              hasPadding={true}
              tableHeader={offersHeader}
              OffersData={offers}
              setRefresh={setRefresh}
            />
          )}
        </LoadingWrapper>
      </Layout>
    </>
  );
}
