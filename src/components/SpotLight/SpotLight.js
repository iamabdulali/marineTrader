import React, { useContext, useEffect, useState } from "react";
import HomeHeading from "../HomeHeading";
import SpotLightListings from "../SpotLightListings/SpotLightListings";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

const SpotLight = () => {
  const { country, selectedCategory } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [homeSpotlights, setHomeSpotlights] = useState([]);
  const [categorySpotlights, setCategorySpotlights] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [spotlightType, setSpotlightType] = useState("home");

  const getSpotlight = async (country, setData, url) => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/${url}/spotlight?country=${
          country || "United Kingdom"
        }&category_id=${selectedCategory?.id}`
      );
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpotlight(country?.countryName, setHomeSpotlights, "home");
  }, [country]);

  useEffect(() => {
    getSpotlight(country?.countryName, setCategorySpotlights, "category");
  }, [country, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setSpotlightType("category");
    }
  }, [selectedCategory]);

  return (
    <div className="mt-24 relative min-h-[40vh]">
      {/* {spotlightType == "category" ? (
        <HomeHeading
          heading="In The Spotlight"
          buttonText="Back To Home Spotlights"
          to="/"
          className="2xl:px-24 sm:px-10 px-6"
          onClick={() => setSpotlightType("home")}
        />
      ) : (
        ""
      )} */}
      <HomeHeading
        heading="In The Spotlight"
        buttonText=""
        to="/"
        className="2xl:px-24 sm:px-10 px-6"
      />

      <LoadingWrapper
        loading={loading}
        className="-top-1/2 xl:-translate-x-0 -translate-x-1/2"
      >
        {spotlightType == "category" ? (
          categorySpotlights.length == 0 ? (
            <p className="min-h-[40vh] flex items-center justify-center mt-6">
              No Category SpotLights Found
            </p>
          ) : (
            <>
              <div className="2xl:px-24 sm:px-10 px-6 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
                {categorySpotlights.map(
                  ({
                    id,
                    title,
                    price,
                    category_id,
                    images,
                    advert_package_id,
                    make,
                    model,
                    category,
                    year,
                  }) => (
                    <SpotLightListings
                      make={make}
                      model={model}
                      year={year}
                      category={category}
                      key={id}
                      id={id}
                      title={title}
                      category_id={category_id}
                      price={price}
                      image={images[0]?.image}
                      advertID={advert_package_id}
                      setRefresh={setRefresh}
                    />
                  )
                )}
              </div>
              {/* <div className="text-center">
                <button className="text-[#8891B2] hover:bg-[#78809e] hover:text-white hover:border-white border-2 border-[#8891B2] py-3 px-5 rounded-lg mt-16">
                  Show More
                </button>
              </div> */}
            </>
          )
        ) : homeSpotlights.length == 0 ? (
          <p className="min-h-[40vh] flex items-center justify-center mt-6">
            No Home SpotLights Found
          </p>
        ) : (
          <>
            <div className="2xl:px-24 sm:px-10 px-6 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
              {homeSpotlights.map(
                ({
                  id,
                  title,
                  price,
                  category_id,
                  images,
                  advert_package_id,
                  make,
                  model,
                  category,
                  year,
                }) => (
                  <SpotLightListings
                    make={make}
                    model={model}
                    year={year}
                    category={category}
                    key={id}
                    id={id}
                    title={title}
                    category_id={category_id}
                    price={price}
                    image={images[0]?.image}
                    advertID={advert_package_id}
                    setRefresh={setRefresh}
                  />
                )
              )}
            </div>
            {/* <div className="text-center">
              <button className="text-[#8891B2] hover:bg-[#78809e] hover:text-white hover:border-white border-2 border-[#8891B2] py-3 px-5 rounded-lg mt-16">
                Show More
              </button>
            </div> */}
          </>
        )}
      </LoadingWrapper>

      {/* <HomeHeading
        heading="Latest News"
        buttonText="View All"
        to="/"
        className="mt-16 2xl:px-24 sm:px-10 px-6"
      />
      <div className="2xl:px-24 sm:px-10 px-6 mt-10 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {newsData.map(({ id, newsDate, newsTitle, isNews, thumbnail }) => (
          <SpotLightListings
            key={id}
            newsDate={newsDate}
            newsTitle={newsTitle}
            isNews={isNews}
            thumbnail={thumbnail}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SpotLight;
