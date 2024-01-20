import React from "react";

const Heading = ({ content }) => {
  return (
    <h2 className=" text-[#0D1A8B] font-semibold text-xl flex items-center gap-2">
      <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
      {content}
    </h2>
  );
};

export default Heading;
