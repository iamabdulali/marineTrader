import React from "react";

function SelectDays({ values, setFieldValue, editable }) {
  const handleDayClick = (day) => {
    const { working_days, service_hours } = values.user;
    const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    const dayIndex = daysOfWeek.findIndex(
      (item) => item.toLowerCase() === day.toLowerCase()
    );

    if (dayIndex === -1) {
      console.error("Invalid day:", day);
      return;
    }

    const isDayAlreadySelected = working_days.some(
      (item) => item.day.toLowerCase() === day.toLowerCase()
    );

    if (!isDayAlreadySelected) {
      const updatedDays = [
        ...working_days,
        {
          id: working_days.length + 1,
          user_id: values.user.id,
          day: day.toLowerCase(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      updatedDays.sort((a, b) => {
        const indexA = daysOfWeek.findIndex(
          (item) => item.toLowerCase() === a.day.toLowerCase()
        );
        const indexB = daysOfWeek.findIndex(
          (item) => item.toLowerCase() === b.day.toLowerCase()
        );
        return indexA - indexB;
      });

      setFieldValue("user.working_days", updatedDays);
    } else {
      const updatedDays = working_days.filter(
        (item) => item.day.toLowerCase() !== day.toLowerCase()
      );
      setFieldValue("user.working_days", updatedDays);

      const updatedServiceHours = service_hours.map((item) =>
        item.day.toLowerCase() === day.toLowerCase()
          ? { ...item, start_time: null, end_time: null }
          : item
      );
      setFieldValue("user.service_hours", updatedServiceHours);
    }
  };

  return (
    <>
      <label className="block text-[#8891B2] text-sm font-medium">
        Selected Days
      </label>
      <div className="flex gap-4 items-center mt-4 flex-wrap">
        {values.user.working_days.map(({ day, id }) => {
          return (
            <p
              key={id}
              className="bg-[#0D1A8B] uppercase smallLg:text-base text-sm text-white py-2 text-center min-w-24 px-4 rounded-lg"
            >
              {day}
            </p>
          );
        })}
      </div>
      {editable ? (
        <div>
          <p className="font-semibold my-5">Select or Deselect Days:</p>
          <div className="flex gap-3  flex-wrap">
            {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => {
              const isDaySelected = values.user?.working_days.some(
                (item) => item.day.toLowerCase() === day.toLowerCase()
              );

              return (
                <div key={day}>
                  <button
                    type="button"
                    name="daysAvailable"
                    className={`${
                      isDaySelected
                        ? "bg-[#0D1A8B] text-white"
                        : "bg-white text-[#8891B2] border-2 border-[#e0deee] rounded-md"
                    } p-3 rounded-md w-28`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SelectDays;
