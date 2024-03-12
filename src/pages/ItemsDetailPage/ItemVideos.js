import React from "react";

const ItemVideos = ({ advert }) => {
  const { video } = Object(advert);
  return (
    <video autoPlay controls loop className="w-full">
      <source src={video?.video}></source>
    </video>
  );
};

export default ItemVideos;
