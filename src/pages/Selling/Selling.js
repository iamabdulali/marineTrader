import React, { useContext, useEffect, useState } from "react";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import AdSubscription from "../AdSubscription/AdSubscription";
import VideoBtn from "../../components/VideoTutorial/VideoBtn";
import Modal from "../../components/Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import VideoModal from "../../components/VideoTutorial/VideoModal";
import { fetchOptions, getAdvert } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";

export default function Selling() {
  const [loading, setLoading] = useState(true);
  const [hasListing, setHasListing] = useState(true);
  let [isVideoOpen, setIsVideoOpen] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAdvert(setAdverts, setLoading);
    fetchOptions("categories", setCategories);
  }, []);

  console.log(adverts);

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
          <div className="overflow-x-scroll category-menu">
            <CategoryList
              initialCategory={-1}
              className="flex lg:w-full min-h-[88px] mt-5 justify-between px-4 bg-white border-2 rounded-lg border-[#D9DFF5] smallLg:w-auto w-[1300px]"
              activeCategory="border-b-4 border-[#0D1A8B] py-3"
              unActiveCategory="py-3"
              onCategoryChange={(category) => {
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
          <VideoBtn onClick={() => openModal(setIsVideoOpen)} />
          <Modal
            isOpen={isVideoOpen}
            onClose={() => closeModal(setIsVideoOpen)}
            opacity="bg-opacity-40"
            width="xl:w-6/12 sm:w-10/12 w-full"
          >
            <VideoModal />
          </Modal>
        </LoadingWrapper>
      </Layout>
      {/* <BuildAd /> */}
    </>
  );
}
