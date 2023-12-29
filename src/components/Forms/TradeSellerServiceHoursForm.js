import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

export default function TradeSellerServiceHoursForm() {
  const [serviceType, setServiceType] = useState("open12Hours");
  const [contactNumber, setContactNumber] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayTimes, setDayTimes] = useState({});
  const [publicHolidays, setPublicHolidays] = useState("no"); // State to manage the selected value

  const handlePublicHolidaysChange = (event) => {
    setPublicHolidays(event.target.value);
    console.log(event.target.value);
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleAreaCodeChange = (event) => {
    setAreaCode(event.target.value);
  };

  const handleDayClick = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
      setDayTimes({ ...dayTimes, [day]: null });
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleTimeChange = (day, event) => {
    setDayTimes({ ...dayTimes, [day]: event.target.value });
  };

  return (
    <div className="sm:mx-8 mx-3">
      <h2 className=" text-[#0D1A8B] font-semibold text-xl mt-10 flex items-center gap-2">
        <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
        Service Form
      </h2>
      <div className="flex sm:flex-row flex-col my-8 sm:gap-0 gap-5">
        <div className="radio">
          <input
            id="12-hour"
            type="radio"
            value="open12Hours"
            checked={serviceType === "open12Hours"}
            onChange={handleServiceTypeChange}
          />
          <label htmlFor="12-hour" className="text-[#11133D] radio-label">
            Open 12 hours
          </label>
        </div>

        <div className="radio">
          <input
            id="outOfService"
            type="radio"
            value="outOfHoursService"
            checked={serviceType === "outOfHoursService"}
            onChange={handleServiceTypeChange}
          />
          <label
            htmlFor="outOfService"
            className="text-[#11133D] radio-label sm:ml-5"
          >
            Out of hours service
          </label>
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex gap-5 w-full sm:flex-row flex-col my-3 ">
        <label className=" inline-block w-full">
          Area Code:
          <Field
            as="select"
            name="areaCode"
            // value={areaCode}
            // onChange={handleAreaCodeChange}
            className="border-[#CECED7] border-2 rounded-md p-3 w-full block text-[#8891B2] mt-3"
          >
            <option value="">Select Area Code</option>
            <option value="areaCode1">Area Code 1</option>
            <option value="areaCode2">Area Code 2</option>
            {/* Add more options as needed */}
          </Field>
          <ErrorMessage
            name="areaCode"
            component="span"
            className="text-red-500"
          />
        </label>
        <label className="inline-block w-full">
          Contact Number:
          <Field
            type="text"
            // value={contactNumber}
            // onChange={handleContactNumberChange}
            placeholder="000000000"
            name="contactNumber"
            className="border-[#CECED7] border-2 rounded-md p-3 w-full block text-[#8891B2] mt-3"
          />
          <ErrorMessage
            name="contactNumber"
            component="span"
            className="text-red-500"
          />
        </label>
      </div>

      {/* Select Days */}
      <div>
        <p className=" font-semibold my-5">Select Days:</p>
        <div className="flex gap-3 sm:flex-nowrap flex-wrap">
          {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((day) => (
            <div key={day}>
              <button
                type="button"
                name="selectedDays"
                className={`${
                  selectedDays.includes(day)
                    ? "bg-[#0D1A8B] text-white"
                    : "bg-white text-[#8891B2] border-2 border-[#e0deee] rounded-md"
                } p-3 rounded-md w-28`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
        <div
          className={`text-red-500 ${
            selectedDays.length == 0 ? "block" : "hidden"
          }`}
        >
          Select One Day At Least
        </div>
        <div className="flex items-center gap-1 mt-8">
          <p className="text-[#0D1A8B] font-semibold  min-w-28">Select Time</p>
          <p className="bg-[#CECED7] w-full h-[2px]"></p>
        </div>
        <div>
          {selectedDays.map((selectedDay) => (
            <div key={selectedDay} className="mt-10">
              <label className="flex items-center gap-4">
                <span className="text-[#11133D] font-medium min-w-14">
                  {selectedDay}
                </span>
                <Field
                  as="select"
                  value={dayTimes[selectedDay] || ""}
                  name="startTime"
                  onChange={(event) => handleTimeChange(selectedDay, event)}
                  className="border-[#CECED7] border-2 rounded-md p-3 w-48 block text-[#8891B2]"
                >
                  <option value="12:00pm">12:00 PM</option>
                  <option value="12:30pm">12:30 PM</option>
                  <option value="12:45pm">12:45 PM</option>
                  {/* Add more options as needed */}
                </Field>
                <span className="text-[#11133D] font-medium">To</span>
                <Field
                  as="select"
                  name="endTime"
                  value={dayTimes[selectedDay] || ""}
                  onChange={(event) => handleTimeChange(selectedDay, event)}
                  className="border-[#CECED7] border-2 rounded-md p-3 w-48 block text-[#8891B2]"
                >
                  <option value="12">12:00 AM</option>
                  <option value="13">12:30 AM</option>
                  <option value="14">12:45 AM</option>
                  {/* Add more options as needed */}
                </Field>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-[#0D1A8B] font-semibold  min-w-28">
          Open Public Holidays:
        </p>
        <div className="mt-5 flex">
          <div className="radio">
            <input
              id="yes-checkbox"
              type="radio"
              value="yes"
              checked={publicHolidays === "yes"}
              onChange={handlePublicHolidaysChange}
            />
            <label htmlFor="yes-checkbox" className="radio-label mr-5">
              Yes
            </label>
          </div>
          <div className="radio">
            <input
              id="no-checkbox"
              type="radio"
              value="no"
              checked={publicHolidays === "no"}
              onChange={handlePublicHolidaysChange}
            />
            <label htmlFor="no-checkbox" className="radio-label">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
