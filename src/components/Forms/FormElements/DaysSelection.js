import { ErrorMessage } from "formik";
import React from "react";

function DaysSelection({ values, setValues }) {
  const handleDayClick = (day) => {
    const { working_days } = values;
    const selectedIndex = working_days.indexOf(day);
    let newSelectedDays = [...working_days];

    if (selectedIndex === -1) {
      newSelectedDays.push(day);
    } else {
      newSelectedDays.splice(selectedIndex, 1);
    }

    // Sort the selected days before updating the state
    newSelectedDays = newSelectedDays.sort((a, b) => {
      const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    });

    setValues({ ...values, working_days: newSelectedDays });
  };
  return (
    <>
      {/* Select Days */}
      <div>
        <p className="font-semibold my-5">Select Days:</p>
        <div className="flex gap-3  flex-wrap">
          {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>
              <button
                type="button"
                name="daysAvailable"
                className={`${
                  values.working_days.includes(day)
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
        <ErrorMessage
          name="working_days"
          component="div"
          className="text-red-500 mt-3"
        />
      </div>
    </>
  );
}

export default DaysSelection;
