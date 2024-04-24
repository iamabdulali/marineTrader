import React, { useContext } from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { boatImage, featuredImage } from "../../assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { categoriesList } from "../..";

const SpotLightListings = ({
  id,
  title,
  price,
  isFeatured,
  isNews,
  newsTitle,
  newsDate,
  thumbnail,
  category_id,
  image,
  advertID,
  make,
  setRefresh,
  category,
  model,
  year,
}) => {
  const { selectedCategory } = useContext(AuthContext);

  return (
    <Link
      to={`/listings/${category?.name}/${make?.name}-${model?.name}-${year}/${id}`}
      onClick={() => setRefresh((prev) => !prev)}
    >
      {isNews ? (
        <div>
          <img src={thumbnail} className="w-full" />
          <p className="text-[#8891B2] text-sm mt-2">{newsDate}</p>
          <p className="text-[#11133D] font-semibold mt-2 mb-3">{newsTitle}</p>
        </div>
      ) : (
        <div>
          <div className="relative w-full ">
            <img
              src={image}
              className="w-full lg:max-h-[250px] lg:min-h-[250px] object-cover max-h-[250px] min-h-[250px]"
            />
            <FaHeart className="absolute right-4 top-4" size={20} />
            {advertID == "3" ? (
              <img src={featuredImage} className="absolute w-28 top-3" />
            ) : (
              ""
            )}
          </div>
          <p className="text-[#8891B2] text-sm mt-2">
            {categoriesList[category_id]}
          </p>
          <p className="text-[#11133D] font-semibold">{title}</p>
          <p className="text-[#0D1A8B] mt-2 font-semibold">
            £{Number(price).toFixed(0)}
          </p>
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
