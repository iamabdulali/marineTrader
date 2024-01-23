import React from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { boatImage, featuredImage } from "../../assets";
import { Link } from "react-router-dom";

const SpotLightListings = ({
  id,
  listingType,
  listingName,
  listingPrice,
  isFeatured,
  isNews,
  newsTitle,
  newsDate,
  thumbnail,
}) => {
  return (
    <Link to={`/${id}`}>
      {isNews ? (
        <div>
          <img src={thumbnail} className="w-full" />
          <p className="text-[#8891B2] text-sm mt-2">{newsDate}</p>
          <p className="text-[#11133D] font-semibold mt-2 mb-3">{newsTitle}</p>
        </div>
      ) : (
        <div>
          <div className="relative w-full">
            <img src={boatImage} className="w-full" />
            <FaHeart className="absolute right-4 top-4" size={20} />
            {isFeatured ? (
              <img src={featuredImage} className="absolute w-28 top-3" />
            ) : (
              ""
            )}
          </div>
          <p className="text-[#8891B2] text-sm mt-2">{listingType}</p>
          <p className="text-[#11133D] font-semibold">{listingName}</p>
          <p className="text-[#0D1A8B] mt-2 font-semibold">{listingPrice}</p>
        </div>
      )}

      {isNews ? (
        <Link
          className="text-[#0D1A8B] flex items-center gap-4 font-semibold"
          to="/news"
        >
          Read More <FaArrowRight />
        </Link>
      ) : (
        ""
      )}
    </Link>
  );
};

export default SpotLightListings;