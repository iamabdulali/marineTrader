import React from "react";
import { FormField } from "../../components/FormField";
import { FaCheck } from "react-icons/fa";

const BusinessDetails = ({ user }) => {
  return (
    <>
      <FormField
        label="Time Zone"
        FieldType="text"
        inputField={false}
        value={user?.timezone}
        name="timezone"
      />
      <label className="block text-[#8891B2] text-sm font-medium">
        Selected Days
      </label>
      <div className="flex gap-4 items-center mt-4 flex-wrap">
        {["Mon", "Tues", "Wed"].map((days, index) => {
          return (
            <p
              key={index}
              className="bg-[#0D1A8B] smallLg:text-base text-sm text-white py-2 text-center min-w-24 px-4 rounded-lg"
            >
              {days}
            </p>
          );
        })}
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Opening Hours
      </label>
      {/* <div className="grid sm:grid-cols-2 gap-4 mt-4 smallLg:text-base text-sm">
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
      </div> */}
      <div className="grid sm:grid-cols-2 gap-4 mt-4 smallLg:text-base text-sm">
        {user?.service_hours.map((item) => {
          {
            return item.start_time !== null && item.end_time !== null ? (
              <div className="flex items-center gap-6 font-medium">
                <p className="uppercase">{item.day}</p>
                <p>
                  {item.start_time} - {item.end_time}
                </p>
              </div>
            ) : null;
          }
        })}
      </div>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Public Holidays
      </label>
      <p className="font-medium mt-2 capitalize">{user?.public_holiday}</p>
      <label className="block mt-6 text-[#8891B2] text-sm font-medium">
        Facilities
      </label>
      <div className="grid sm:grid-cols-3 mt-3 gap-4">
        {["Accmodation", "Delivery", "Showroom", "Shop", "Counter"].map(
          (facilities, index) => {
            return (
              <p
                key={index}
                className="flex items-center gap-2 font-medium smallLg:text-base text-sm"
              >
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
