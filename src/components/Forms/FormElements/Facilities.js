import { Field } from "formik";
import React, { useState } from "react";
import { initialFacilities } from "../../../utils/DummyData";
import FacilitiesModal from "../FacilitiesModal";
import {
  closeModal,
  openModal,
} from "../../../utils/ModalOpeningClosingFunctions";
import { plusSign } from "../../../assets";
import Modal from "../../Modal";

function Facilities() {
  const [facilities, setFacilities] = useState(initialFacilities.facilities);
  const [newFacility, setNewFacility] = useState("");
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

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
    closeModal(setIsFacilitiesOpen);
  };

  return (
    <>
      <h2 className=" text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Facilities
      </h2>
      <div className="grid 2xl:grid-cols-4 gap-5  mt-6 lg:grid-cols-3 sm:grid-cols-2">
        {Object.keys(facilities).map((facility) => (
          <div key={facility}>
            <label className="flex text-[#11133D]">
              <Field
                className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                type="checkbox"
                name="facilities"
                value={facility}
              />
              {facility}
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 my-8">
        <img className="w-5" src={plusSign} alt="plus-sign" />
        <button
          onClick={() => openModal(setIsFacilitiesOpen)}
          className="text-[#0D1A8B] underline font-semibold"
        >
          Add More Facility
        </button>
      </div>
      <Modal
        isOpen={isFacilitiesOpen}
        onClose={() => closeModal(setIsFacilitiesOpen)}
        opacity="bg-opacity-40"
        width="md:w-1/2 xl:w-1/3 w-full"
      >
        <FacilitiesModal
          onClick={handleAddFacility}
          value={newFacility}
          onChange={handleNewFacilityChange}
          onClose={() => closeModal(setIsFacilitiesOpen)}
        />
      </Modal>
    </>
  );
}

export default Facilities;
