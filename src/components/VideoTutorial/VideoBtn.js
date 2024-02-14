import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const VideoBtn = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#0D1A8B] flex items-center gap-3 text-white custom-shadow rounded-lg py-4 w-fit cursor-pointer fixed bottom-7 right-7 px-5"
    >
      <FaPlayCircle size={24} />
      <p className="font-semibold">Video Tutorial</p>
    </div>
  );
};

export default VideoBtn;
