import React from "react";

const FacilitiesModal = ({ value, onChange, onClick }) => {
  return (
    <div className="p-5">
      <p className="font-semibold mb-3 text-[#11133D]">Add Your Facility</p>
      <input
        type="text"
        placeholder="New Facility"
        name="new-facility"
        value={value}
        onChange={onChange}
        className="border-[#CECED7] border-2 rounded-md p-3 w-full"
      />
      <button
        type="button"
        className="bg-[#0D1A8B] hover:bg-[#0a1dbd] block mt-5 w-full text-white p-3 rounded-md"
        onClick={onClick}
      >
        Add Facility
      </button>
    </div>
  );
};

export default FacilitiesModal;
