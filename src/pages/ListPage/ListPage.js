import React, { useContext, useEffect, useState } from "react";
import BuyerLayout from "../../components/BuyerLayout/BuyerLayout";
import ListingItem from "../../components/ListingItem/ListingItem";
import SearchFilter from "../../components/ListingItem/SearchFilter";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { FaChevronDown } from "react-icons/fa";
import SortingOptionsMenu from "../../components/SortingOptionsMenu";
import CustomDropdownMenu from "../../components/CustomDropdownMenu";
import {
  handleSortByDate,
  handleSortByPrice,
} from "../../utils/SortingFunctions";
import { AuthContext } from "../../Context/AuthContext";

const ListPage = () => {
  const { selectedCategory } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const make = queryParams.get("make");
  const model = queryParams.get("model");
  const type = queryParams.get("type");
  const condition = queryParams.get("condition");
  const year = queryParams.get("year");

  const [searchedListings, setSearchedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchedListing = async () => {
      try {
        let url = `${SERVER_BASE_URL}?`;
        if (category) url += `category=${category}&`;
        if (make) url += `make=${make}&`;
        if (model) url += `model=${model}&`;
        if (type) url += `type=${type}&`;
        if (condition) url += `condition=${condition}&`;
        if (year) url += `year=${year}&`;

        if (url.endsWith("&")) {
          url = url.slice(0, -1);
        }

        const { data } = await axios.get(url);
        setSearchedListings(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    searchedListing();
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const [sortType, setSortType] = useState("Sort By");

  console.log(searchedListings);

  return (
    <BuyerLayout showCategoryList={true}>
      <div className="2xl:px-24 sm:px-10 px-4">
        <SearchFilter
          setCategoryName={setCategoryName}
          setSearchedListings={setSearchedListings}
          setLoading={setLoading}
          make={make}
          model={model}
        />
        <div className="flex items-center justify-between mb-8">
          <p className="md:text-2xl text-xl text-[#11133D] font-semibold capitalize">
            {/* {selectedCategory?.name || "All"} For Sale */}
            {`${categoryName || "All"} For Sale`}
          </p>

          <div className="relative inline-block mr-7">
            <CustomDropdownMenu
              buttonToOpenMenu={
                <>
                  <button
                    className="border-2 hover:bg-[#8891B2] hover:text-white hover:border-[#8891B2] text-sm border-[#C8C8C8] rounded-lg flex items-center gap-4 md:py-3 px-3 py-2 text-[#8891B2]"
                    name="sortLists"
                  >
                    {sortType}

                    <FaChevronDown size={12} />
                  </button>
                </>
              }
              children={
                <SortingOptionsMenu
                  handleSortByDate={handleSortByDate}
                  handleSortByPrice={handleSortByPrice}
                  items={searchedListings}
                  setItems={setSearchedListings}
                  setSortType={setSortType}
                />
              }
            />
          </div>
        </div>

        <div className="min-h-[50vh]">
          <LoadingWrapper
            loading={loading}
            className="top-1/4 xl:-translate-x-0 -translate-x-1/2"
          >
            {searchedListings.length == 0 ? (
              <div>No Listing Found</div>
            ) : (
              searchedListings?.map((listing, index) => {
                return <ListingItem key={index} itemData={listing} />;
              })
            )}
          </LoadingWrapper>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default ListPage;
