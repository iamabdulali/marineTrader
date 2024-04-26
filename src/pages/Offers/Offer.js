import React, { useEffect, useState } from "react";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { offersHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import { fetchOffers } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { filterOfferByStatus } from "../../utils/SortingFunctions";

export default function Offer() {
  const [originalOffers, setOriginalOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchOffers(setOriginalOffers, setLoading);
  }, [refresh]);

  // Whenever originalOffers changes, update filteredOffers to match it
  useEffect(() => {
    setFilteredOffers(originalOffers);
  }, [originalOffers]);

  const handleFilterByStatus = (selectedStatus) => {
    filterOfferByStatus(selectedStatus, originalOffers, setFilteredOffers);
  };

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
            OffersData={filteredOffers} // Render the filteredOffers
            setRefresh={setRefresh}
            isStatusSorting={"offer"}
            handleSortByStatus={handleFilterByStatus} // Use the handleFilterByStatus function
            setItemsData={setFilteredOffers} // Update the filteredOffers state
          />
        </LoadingWrapper>
      </Layout>
    </>
  );
}
