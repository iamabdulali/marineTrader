import React from "react";
import { FaCheck } from "react-icons/fa";

const Specifications = ({ advert }) => {
  const { modifications, accessories, features, conveniences } = Object(advert);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-y-10 ">
        <div>
          <p className="text-[#11133D] font-semibold sm:text-xl text-base">
            Modifications
          </p>
          {modifications?.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="flex gap-4 font-medium mt-5 text-[#696E9D] sm:text-base text-sm"
              >
                <p className="bg-[#3B82F6] bg-opacity-20 rounded-full  h-6 w-6 flex items-center justify-center">
                  <FaCheck color="#0D1A8B" size={10} />
                </p>
                {name}
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-[#11133D] font-semibold sm:text-xl text-base">
            Feature
          </p>
          {features?.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="flex gap-4 font-medium mt-5 text-[#696E9D] sm:text-base text-sm"
              >
                <p className="bg-[#3B82F6] bg-opacity-20 rounded-full  h-6 w-6 flex items-center justify-center">
                  <FaCheck color="#0D1A8B" size={10} />
                </p>
                {name}
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-[#11133D] font-semibold sm:text-xl text-base">
            Convenience
          </p>
          {conveniences?.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="flex gap-4 font-medium mt-5 text-[#696E9D] sm:text-base text-sm"
              >
                <p className="bg-[#3B82F6] bg-opacity-20 rounded-full  h-6 w-6 flex items-center justify-center">
                  <FaCheck color="#0D1A8B" size={10} />
                </p>
                {name}
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-[#11133D] font-semibold sm:text-xl text-base">
            Accessories
          </p>
          {accessories?.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="flex gap-4 font-medium mt-5 text-[#696E9D] sm:text-base text-sm"
              >
                <p className="bg-[#3B82F6] bg-opacity-20 rounded-full  h-6 w-6 flex items-center justify-center">
                  <FaCheck color="#0D1A8B" size={10} />
                </p>
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specifications;
