import React, { useState } from "react";
import { plusSign } from "../../assets";

const initialFacilities = {
  Accommodation: false,
  "Licensed Bar": false,
  Restaurant: false,
  "24/7 Support": false,
  "Service Department": false,
  Reception: false,
  Counter: false,
  Parking: false,
  "Disabled Access": false,
  Finance: false,
  "Equipment Hire": false,
  "On Site Transport": false,
  Delivery: false,
  Showroom: false,
  Shop: false,
  Parts: false,
  Dsds: false,
};

export default function TradeSellerFacilitiesForm() {
  const [facilities, setFacilities] = useState(initialFacilities);
  const [newFacility, setNewFacility] = useState("");

  const handleFacilityChange = (facility) => {
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [facility]: !prevFacilities[facility],
    }));
  };

  const handleNewFacilityChange = (e) => {
    setNewFacility(e.target.value);
  };

  const handleAddFacility = () => {
    if (newFacility.trim() !== "") {
      setFacilities((prevFacilities) => ({
        ...prevFacilities,
        [newFacility]: false,
      }));
      setNewFacility("");
    }
  };

  return (
    <div>
      <h2 className="sm:mx-8 mx-3 text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Facilities
      </h2>
      <div className="grid 2xl:grid-cols-4 gap-5 sm:mx-8 mx-3 mt-6 lg:grid-cols-3 sm:grid-cols-2">
        {Object.keys(facilities).map((facility) => (
          <div key={facility}>
            <label className="flex text-[#11133D]">
              <input
                className="w-[24px] h-[24px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                type="checkbox"
                checked={facilities[facility]}
                onChange={() => handleFacilityChange(facility)}
              />
              {facility}
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 sm:mx-8 mx-3 my-8">
        <img className="w-5" src={plusSign} alt="plus-sign" />
        <p className="text-[#0D1A8B] underline font-semibold">
          Add More Facility
        </p>
      </div>

      <div className="flex items-center sm:mx-8 mx-3 sm:flex-row flex-col gap-5">
        <input
          type="text"
          placeholder="New Facility"
          value={newFacility}
          onChange={handleNewFacilityChange}
          className="border-[#CECED7] border-2 rounded-md p-3 sm:w-72 w-full sm:mr-6"
        />
        <button
          className="bg-[#0D1A8B] text-white p-3 rounded-md"
          onClick={handleAddFacility}
        >
          Add Facility
        </button>
      </div>
    </div>
  );
}
