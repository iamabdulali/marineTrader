import React, { useState } from "react";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import AdSubscription from "../AdSubscription/AdSubscription";

export default function Selling() {
  const [hasListing, setHasListing] = useState(true);
  const [category, setCategory] = useState("Jet Skis");
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <Heading content={hasListing ? "Selling" : "Create a New Listing"} />
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
              Back To Listings
            </Link>
          )}
        </div>
        {/* <p className="font-semibold text-[#11133D] mt-5">
          Select a new listing
        </p> */}
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
              setCategory(category);
              setHasListing(false);
            }}
            onCategoryClick={() => {}}
          />
        </div>
        {hasListing ? (
          <div className="pb-40">
            <ListingTable
              tableFor="Your Listings"
              hasSort={true}
              hasPadding={true}
              sellingListing={true}
              tableHeader={sellingHeader}
            />
          </div>
        ) : (
          <div className={hasListing ? "" : "mt-7"}>
            {/* <p className="font-semibold text-[#11133D] my-5">
              Subscription For {category}
            </p> */}
            <AdSubscription />
          </div>
        )}
      </Layout>
    </>
  );
}
