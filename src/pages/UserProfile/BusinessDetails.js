import React from "react";
import { FormField } from "../../components/FormField";
import { FaCheck } from "react-icons/fa";

const BusinessDetails = () => {
  return (
    <>
      <FormField
        label="Time Zone"
        FieldType="text"
        inputField={false}
        value="John Smith"
        name="firstName"
      />
      <label className="block text-[#8891B2] text-sm font-medium">
        Selected Days
      </label>
      <div className="flex gap-4 items-center mt-4">
        {["Mon", "Tues", "Wed"].map((days) => {
          return (
            <p className="bg-[#0D1A8B] text-white py-2 text-center min-w-24 px-4 rounded-lg">
              {days}
            </p>
          );
        })}
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Opening Hours
      </label>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-6 font-medium">
          <p className="uppercase">MON</p>
          <p>12:00PM - 08:00PM</p>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <p className="uppercase">Tues</p>
          <p>12:00PM - 08:00PM</p>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <p className="uppercase">Wed</p>
          <p>12:00PM - 08:00PM</p>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <p className="uppercase">Thru</p>
          <p>12:00PM - 08:00PM</p>
        </div>
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Public Holidays
      </label>
      <p className="font-medium mt-2">Yes</p>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Facilities
      </label>
      <div className="grid grid-cols-3 mt-3 gap-4">
        {["Accmodation", "Delivery", "Showroom", "Shop", "Counter"].map(
          (facilities) => {
            return (
              <p className="flex items-center gap-2 font-medium">
                <FaCheck color="#0D1A8B" /> {facilities}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default BusinessDetails;
