import React from "react";
import Modal from "../Modal";
import Bundles from "./Bundles";

const BundlesModal = ({ onClick }) => {
  return (
    <>
      <Modal className="w-6/12">
        <div className="bg-gradient-to-t py-4 rounded-tr-lg rounded-tl-lg from-[#0d1a8b] to-[#3241cb]">
          <p className="text-white text-xl font-semibold text-center mb-1">
            BUNDLES : STANDARD Advert
          </p>
          <p className="text-[#A2A9EB] text-sm text-center">
            Current price per advert: £ 0.99
          </p>
        </div>
        <div className="py-4 px-6">
          <p className="text-sm text-[#8891B2] mt-2 mb-4">
            Select the most suitable bundle for you:
          </p>
          <Bundles
            bundleNameColor="text-[#1565D8]"
            bundleBorder="border-[#1565D8]"
            bgColor="bg-[#F7FAFF]"
            BundleName="BASIC"
            adverts="20"
            price="19.79"
            checkbox="basic-bundle"
          />
          <Bundles
            bundleNameColor="text-[#36B37E]"
            bundleBorder="border-[#36B37E]"
            bgColor="bg-[#E9FFF6]"
            BundleName="STANDARD"
            adverts="50"
            price="49.49"
            checkbox="standard-bundle"
          />
          <Bundles
            bundleNameColor="text-[#E6AB13]"
            bundleBorder="border-[#E6AB13]"
            bgColor="bg-[#FFFCF6]"
            BundleName="ADVANCED"
            adverts="100"
            price="99.00"
            checkbox="advanced-bundle"
          />
          <Bundles
            bundleNameColor="text-[#9D13B4]"
            bundleBorder="border-[#9D13B4]"
            bgColor="bg-[#FEF5FF]"
            BundleName="ULTIMATE"
            adverts="250"
            price="247.49"
            checkbox="ultimate-bundle"
          />
          <Bundles
            bundleNameColor="text-[#D81515]"
            bundleBorder="border-[#D81515]"
            bgColor="bg-[#FFF6F6]"
            BundleName="EXTREME"
            adverts="500"
            price="494.99"
            checkbox="extreme-bundle"
          />
        </div>
        <div className="text-right pr-6 pb-6">
          <button
            type="button"
            onClick={onClick}
            className="bg-[#8891B2] text-white py-3 px-7 rounded-md mr-3 min-w-[120px]"
          >
            Close
          </button>
          <button
            type="button"
            className="bg-[#0D1A8B] text-white py-3 px-7 rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BundlesModal;
