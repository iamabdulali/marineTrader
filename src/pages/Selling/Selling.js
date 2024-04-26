import React, { useContext, useEffect, useState } from "react";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import AdSubscription from "../AdSubscription/AdSubscription";
import { getAdvert } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";
import {
  handleSortByDate,
  handleSortByPrice,
} from "../../utils/SortingFunctions";

export default function Selling() {
  const [loading, setLoading] = useState(true);
  const [hasListing, setHasListing] = useState(true);
  let [isVideoOpen, setIsVideoOpen] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const { categories, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getAdvert(setAdverts, setLoading);
  }, []);

  const handleDelete = (idToDelete) => {
    setAdverts((prevAds) => {
      const indexToDelete = prevAds.findIndex(
        (advert) => advert.id === idToDelete
      );
      if (indexToDelete !== -1) {
        return prevAds.toSpliced(indexToDelete, 1);
      }
      return prevAds;
    });
  };

  useEffect(() => {
    dispatch({
      type: "SELECTED_CATEGORY",
      payload: null,
    });
  }, []);

  return (
    <>
      <Layout>
        <LoadingWrapper
          loading={loading}
          className="top-0 xl:-translate-x-0 -translate-x-1/2"
        >
          <div className="flex items-center justify-between">
            <Heading
              content={hasListing ? "Selling" : "Create a New Listing"}
            />
            {hasListing ? (
              ""
            ) : (
              <Link
                onClick={() => {
                  setHasListing(true);
                  dispatch({
                    type: "SELECTED_CATEGORY",
                    payload: null,
                  });
                }}
                className=" text-[#0D1A8B] flex items-center gap-2 font-medium underline"
              >
                <FaArrowLeft size={15} />
                <span className="sm:block hidden">Back To Listings</span>
              </Link>
            )}
          </div>
          <p className="font-semibold text-[#11133D] mt-5">
            {hasListing ? "Select a category to start" : ""}
          </p>
          {/* <div className="category-menu">
            <CategoryList
              initialCategory={-1}
              className="flex smallLg:flex-nowrap smallLg:justify-between flex-wrap lg:w-full min-h-[88px] mt-5 justify-start smallLg:gap-0  gap-4 px-4 bg-white border-2 rounded-lg border-[#D9DFF5]
               smallLg:w-auto"
              activeCategory="border-b-4 border-[#0D1A8B] py-3"
              unActiveCategory="py-3"
              onCategoryChange={(category) => {
                setHasListing(false);
              }}
              onCategoryClick={() => {}}
              categories={categories}
            />
          </div> */}
          <div className="category-menu overflow-x-auto ">
            <CategoryList
              className="flex flex-nowrap justify-between lg:w-full min-h-[88px]  smallLg:gap-0 gap-4 bg-white
              sm:px-4 pl-4 pr-7  mt-3 sm:mb-6 smallLg:w-auto w-[900px]"
              activeCategory="border-b-4 border-[#0D1A8B] py-4"
              unActiveCategory="py-4"
              onCategoryChange={(category) => {
                console.log(category);
                setHasListing(false);
              }}
              onCategoryClick={() => {}}
              categories={categories}
            />
          </div>
          {hasListing ? (
            <>
              {adverts.length != 0 ? (
                <div className="pb-56">
                  <ListingTable
                    tableFor="Your Listings"
                    hasSort={true}
                    hasPadding={true}
                    sellingListing={true}
                    tableHeader={sellingHeader}
                    sellingData={adverts}
                    onDelete={handleDelete}
                    handleSortByDate={handleSortByDate}
                    handleSortByPrice={handleSortByPrice}
                    setItemsData={setAdverts}
                  />
                </div>
              ) : (
                <p className="flex items-center h-[50vh] justify-center ">
                  You are currently running 0 Ads, choose a category to start
                  selling!
                </p>
              )}
            </>
          ) : (
            <div className={hasListing ? "" : "mt-7"}>
              <AdSubscription />
            </div>
          )}
        </LoadingWrapper>
      </Layout>
      {/* <BuildAd /> */}
    </>
  );
}
