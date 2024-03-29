import React, { useContext, useEffect, useState } from "react";
import HomeHeading from "../HomeHeading";
import SpotLightListings from "../SpotLightListings/SpotLightListings";
import { SpotLightListingsData, newsData } from "../../utils/DummyData";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

const SpotLight = () => {
  const { userLocationDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [homeSpotlights, setHomeSpotlights] = useState([]);

  const { country } = Object(userLocationDetails);

  const getHomePageSpotlight = async (country) => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/home/spotlight?country=${country}`
      );
      setHomeSpotlights(data.data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomePageSpotlight(country);
  }, [country]);

  return (
    <div className="mt-24 relative min-h-[40vh]">
      <HomeHeading
        heading="In The Spotlight"
        buttonText="View All"
        to="/"
        className="2xl:px-24 sm:px-10 px-6"
      />
      <LoadingWrapper
        loading={loading}
        className="-top-1/2 xl:-translate-x-0 -translate-x-1/2"
      >
        {homeSpotlights.length == 0 ? (
          <p className="text-center mt-6">No SpotLights Found</p>
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
                }) => (
                  <SpotLightListings
                    key={id}
                    id={id}
                    title={title}
                    category_id={category_id}
                    price={price}
                    image={images[0]?.image}
                    advertID={advert_package_id}
                  />
                )
              )}
            </div>
            <div className="text-center">
              <button className="text-[#8891B2] hover:bg-[#78809e] hover:text-white hover:border-white border-2 border-[#8891B2] py-3 px-5 rounded-lg mt-16">
                Show More
              </button>
            </div>
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
