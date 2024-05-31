import React, { useState } from "react";
import { plusSign } from "../../../assets";
import { FaCheck } from "react-icons/fa";

function Facilities({ values, editable, setFieldValue }) {
  const [newFacility, setNewFacility] = useState("");

  const handleNewFacilityChange = (e) => {
    setNewFacility(e.target.value);
  };

  const handleAddFacility = () => {
    if (newFacility.trim() !== "") {
      const updatedFacilities = [
        ...values.user.facilities,
        { name: newFacility, id: values.user.facilities.length + 1 },
      ];
      setFieldValue("user.facilities", updatedFacilities);
      setNewFacility(""); // Clear input field after adding the facility
    }
  };

  return (
    <>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Facilities
      </label>

      <div className="grid sm:grid-cols-3 mt-3 gap-4">
        {values.user?.facilities.map(({ name, id }) => {
          return (
            <p
              key={id}
              className="flex items-center gap-2 font-medium smallLg:text-base text-sm"
            >
              <FaCheck color="#0D1A8B" /> {name}
            </p>
          );
        })}
      </div>
      {editable ? (
        <div>
          <div className="flex items-center gap-4 my-8">
            <img className="w-5" src={plusSign} alt="plus-sign" />
            <p className="text-[#0D1A8B] underline font-semibold">
              Add More Facility
            </p>
          </div>
          <div className="flex items-center  sm:flex-row flex-col gap-5">
            <input
              type="text"
              placeholder="New Facility"
              name="new-facility"
              value={newFacility}
              onChange={handleNewFacilityChange}
              className="border-[#CECED7] border-2 rounded-md p-3 sm:w-72 w-full sm:mr-0"
            />
            <button
              type="button"
              className="bg-[#0D1A8B] text-white p-3 rounded-md min-w-20 sm:w-auto w-full"
              onClick={handleAddFacility}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Facilities;
