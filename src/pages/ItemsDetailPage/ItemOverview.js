import React from "react";

const ItemOverview = () => {
  return (
    <div>
      <p className="text-[#11133D] font-semibold text-2xl">About this Boat</p>
      <p className="text-[#696E9D] leading-loose mt-2 text-justify">
        Pharetra ut nulla urna turpis euismod risus turpis tempor. Orci sed
        lacus eu nunc nisl at vitae orci. Faucibus fermentum nibh pellentesque
        orci euismod enim. Tellus faucibus tempor sapien risus vitae adipiscing.
        Massa id morbi auctor cum amet.
      </p>
      <div className="mt-7">
        <p className="text-[#11133D] font-semibold text-2xl">Features</p>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-6">
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Boat Type</p>
            <p className="text-[#11133D] font-semibold">Jet Ski</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Jet Ski Make</p>
            <p className="text-[#11133D] font-semibold">Yamaha</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Jet Ski Sit Modal</p>
            <p className="text-[#11133D] font-semibold">Fzs Svho</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Yamaha Engine</p>
            <p className="text-[#11133D] font-semibold">1800cc Svho</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Seat Type</p>
            <p className="text-[#11133D] font-semibold">2 Seater</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Fuel Capacity</p>
            <p className="text-[#11133D] font-semibold">90</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Service History</p>
            <p className="text-[#11133D] font-semibold">Full</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Condition</p>
            <p className="text-[#11133D] font-semibold">Like New</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">CA Year</p>
            <p className="text-[#11133D] font-semibold">2019</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Color</p>
            <p className="text-[#11133D] font-semibold">Red</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Length</p>
            <p className="text-[#11133D] font-semibold">14"</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Hours</p>
            <p className="text-[#11133D] font-semibold">33</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] ">Trailer</p>
            <p className="text-[#11133D] font-semibold">No</p>
          </div>
        </div>
        <p className="text-[#11133D] font-semibold text-2xl mt-14">Tags</p>
        <div className="flex items-center mt-5 gap-4">
          <p className="text-[#0D1A8B] bg-[#F0F1FF] rounded-full font-medium py-3 px-4">
            3k Modifications
          </p>
          <p className="text-[#0D1A8B] bg-[#F0F1FF] rounded-full font-medium py-3 px-4">
            456 Bhp
          </p>
          <p className="text-[#0D1A8B] bg-[#F0F1FF] rounded-full font-medium py-3 px-4">
            Lady In Red
          </p>
          <p className="text-[#0D1A8B] bg-[#F0F1FF] rounded-full font-medium py-3 px-4">
            Supercharge Upgrade
          </p>
        </div>
        <div>
          <p className="text-[#11133D] font-semibold text-2xl mt-14 mb-2">
            Seller Notes
          </p>
          <p className="text-[#8891B2] leading-loose">
            A yacht is a sailing or power vessel used for pleasure, cruising, or
            racing. There is no standard definition, though the term generally
            applies to vessels with a cabin intended for overnight use. To be
            termed a yacht, as opposed to a boat, such a pleasure vessel is
            likely to be at least 33 feet (10 m) in length and may have been
            judged to have good aesthetic qualities.
          </p>
          <p className="text-[#8891B2] leading-loose">
            A yacht is a sailing or power vessel used for pleasure, cruising, or
            racing. There is no standard definition, though the term generally
            applies to vessels with a cabin intended for overnight use. To be
            termed a yacht, as opposed to a boat, such a pleasure vessel is
            likely to be at least 33 feet (10 m) in length and may have been
            judged to have good aesthetic qualities.
          </p>
          <div className="flex items-center mt-6 gap-3">
            <img src={require("../../assets/boat.png")} />
            <div className="flex flex-col gap-3">
              <img src={require("../../assets/boat-2.png")} />
              <img src={require("../../assets/boat-3.png")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOverview;
