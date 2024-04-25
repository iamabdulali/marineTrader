import React from "react";

const ItemVideos = ({ advert }) => {
  const { video } = Object(advert);
  return (
    <>
      {video != null ? (
        <video autoPlay controls loop className="w-full">
          <source src={video?.video}></source>
        </video>
      ) : (
        <p className="text-lg font-semibold">No Video Available</p>
      )}
    </>
  );
};

export default ItemVideos;
