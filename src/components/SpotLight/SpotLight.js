import React from "react";
import HomeHeading from "../HomeHeading";
import SpotLightListings from "../SpotLightListings/SpotLightListings";
import { SpotLightListingsData, newsData } from "../../utils/DummyData";

const SpotLight = () => {
  return (
    <div className="mt-24">
      <HomeHeading
        heading="In The Spotlight"
        buttonText="View All"
        to="/"
        className="2xl:px-24 sm:px-10 px-6"
      />
      <div className="2xl:px-24 sm:px-10 px-6 mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
        {SpotLightListingsData.map(
          ({ listingType, listingName, listingPrice, isFeatured, id }) => (
            <SpotLightListings
              id={id}
              key={id}
              listingType={listingType}
              listingName={listingName}
              listingPrice={listingPrice}
              isFeatured={isFeatured}
            />
          )
        )}
      </div>
      <div className="text-center">
        <button className="text-[#8891B2] hover:bg-[#78809e] hover:text-white hover:border-white border-2 border-[#8891B2] py-3 px-5 rounded-lg mt-16">
          Show More
        </button>
      </div>
      <HomeHeading
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
      </div>
    </div>
  );
};

export default SpotLight;
