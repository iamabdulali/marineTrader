import React from "react";

const ItemOverview = ({ advert }) => {
  const {
    category,
    type,
    model,
    length,
    trailers,
    year,
    condition,
    make,
    service_history,
    hours,
    color,
    tags,
    description,
  } = Object(advert);
  return (
    <div>
      <p className="text-[#11133D] font-semibold sm:text-2xl text-xl">
        About this Boat
      </p>
      <p className="text-[#696E9D] sm:leading-loose leading-loose mt-2 text-justify sm:text-base text-sm">
        Pharetra ut nulla urna turpis euismod risus turpis tempor. Orci sed
        lacus eu nunc nisl at vitae orci. Faucibus fermentum nibh pellentesque
        orci euismod enim. Tellus faucibus tempor sapien risus vitae adipiscing.
        Massa id morbi auctor cum amet.
      </p>
      <div className="mt-7">
        <p className="text-[#11133D] font-semibold sm:text-2xl text-xl">
          Features
        </p>
        <div className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-6">
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Boat Type</p>
            <p className="text-[#11133D] font-semibold">{category?.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Jet Ski Make</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {make?.name}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">
              Jet Ski Sit Modal
            </p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {model?.name}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Yamaha Engine</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              1800cc Svho
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Seat Type</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {type?.name}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Fuel Capacity</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              90
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">
              Service History
            </p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm capitalize">
              {service_history}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Condition</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {condition?.name}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">CA Year</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {year}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Color</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm capitalize">
              {color}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Length</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {length}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Hours</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm">
              {hours}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8891B2] sm:text-base text-sm">Trailer</p>
            <p className="text-[#11133D] font-semibold sm:text-base text-sm capitalize">
              {trailers}
            </p>
          </div>
        </div>
        <p className="text-[#11133D] font-semibold text-2xl mt-14">Tags</p>
        <div className="flex flex-wrap items-center mt-5 gap-4 sm:text-base text-sm">
          {tags.map(({ id, name }) => {
            return (
              <p
                key={id}
                className="text-[#0D1A8B] uppercase bg-[#F0F1FF] rounded-full font-medium py-3 px-4"
              >
                {name}
              </p>
            );
          })}
        </div>
        <div>
          <p className="text-[#11133D] font-semibold sm:text-2xl text-xl mt-14 mb-2">
            Seller Notes
          </p>
          <p className="text-[#8891B2] sm:leading-loose sm:text-base text-sm leading-loose">
            {description}
          </p>

          {/* <div className="flex smallLg:flex-row flex-col items-center mt-6 gap-3">
            <img
              className="smallLg:w-auto w-full"
              src={require("../../assets/boat.png")}
            />
            <div className="flex smallLg:flex-col gap-3 smallLg:w-auto w-full sm:flex-nowrap flex-wrap">
              <img
                className="smallLg:w-auto w-full"
                src={require("../../assets/boat-2.png")}
              />
              <img
                className="smallLg:w-auto w-full"
                src={require("../../assets/boat-3.png")}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ItemOverview;
