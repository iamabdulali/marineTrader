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
        className="px-24"
      />
      <div className="px-24 mt-5 grid grid-cols-4 gap-10">
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
        className="mt-16 px-24"
      />
      <div className="px-24 mt-10 grid grid-cols-3 gap-10">
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
