import { Field, useFormikContext } from "formik";
import React from "react";
import Timing from "../Timing";

const ServiceHours = ({
  service_hours,
  working_days,
  values,
  setValues,
  isUserProfilePage,
}) => {
  const handleTimeChange = (selectedDay, fieldName, value) => {
    console.log({ selectedDay, value, fieldName });
    const updatedServiceHours = service_hours.map((day) => {
      if (day.day.toLowerCase() === selectedDay.toLowerCase()) {
        console.log("POK");
        if (fieldName === "start_time") {
          const endTime = day.end_time || "23:59";
          if (value >= endTime) {
            // Adjust end time to the nearest 15-minute interval after the start time
            const [startHours, startMinutes] = endTime.split(":").map(Number);
            const [endHours, endMinutes] = value.split(":").map(Number);
            const totalStartMinutes = startHours * 60 + startMinutes;
            const totalEndMinutes = endHours * 60 + endMinutes;

            const adjustedEndMinutes = totalStartMinutes - 15;
            const adjustedEndHours = Math.floor(adjustedEndMinutes / 60);
            const adjustedEndMinutesRemainder = adjustedEndMinutes % 60;

            const adjustedEndTime =
              (adjustedEndHours < 10 ? "0" : "") +
              adjustedEndHours +
              ":" +
              (adjustedEndMinutesRemainder === 0
                ? "00"
                : adjustedEndMinutesRemainder < 10
                ? "0" + adjustedEndMinutesRemainder
                : adjustedEndMinutesRemainder);
            return {
              ...day,
              [fieldName]: adjustedEndTime,
            };
          }
        } else if (fieldName === "end_time") {
          const startTime = day.start_time || "00:00";
          if (value <= startTime) {
            // Adjust end time to the nearest 15-minute interval after the start time
            const [startHours, startMinutes] = startTime.split(":").map(Number);
            const [endHours, endMinutes] = value.split(":").map(Number);
            const totalStartMinutes = startHours * 60 + startMinutes;
            const totalEndMinutes = endHours * 60 + endMinutes;

            const adjustedEndMinutes = totalStartMinutes + 15;
            const adjustedEndHours = Math.floor(adjustedEndMinutes / 60);
            const adjustedEndMinutesRemainder = adjustedEndMinutes % 60;

            const adjustedEndTime =
              (adjustedEndHours < 10 ? "0" : "") +
              adjustedEndHours +
              ":" +
              (adjustedEndMinutesRemainder === 0
                ? "00"
                : adjustedEndMinutesRemainder < 10
                ? "0" + adjustedEndMinutesRemainder
                : adjustedEndMinutesRemainder);
            return {
              ...day,
              [fieldName]: adjustedEndTime,
            };
          }
        }

        return {
          ...day,
          [fieldName]: value,
        };
      }
      return day;
    });

    isUserProfilePage
      ? setValues({
          ...values,
          user: {
            ...values.user,
            service_hours: updatedServiceHours,
          },
        })
      : setValues({ ...values, service_hours: updatedServiceHours });

    console.log(updatedServiceHours);
  };

  return (
    <div>
      {isUserProfilePage
        ? working_days?.map(({ day }, index) => {
            // Find the object in service_hours array corresponding to the selected day
            const selectedDayObject = service_hours?.find(
              (service_day) =>
                service_day.day.toLowerCase() === day.toLowerCase()
            );

            // console.log(working_days);
            // console.log(selectedDayObject);

            return (
              <div key={`day_${day}_${index}`} className="mt-10">
                <label className="flex items-center gap-4 flex-wrap">
                  <span className="text-[#11133D] capitalize font-medium min-w-14">
                    {day}
                  </span>
                  <div className="flex items-center gap-4">
                    <Field
                      as="select"
                      value={selectedDayObject?.start_time || ""}
                      name={`service_hours.${day}.start_time`}
                      onChange={(event) =>
                        handleTimeChange(day, "start_time", event.target.value)
                      }
                      className="border-[#CECED7] sm:appearance-auto appearance-none border-2 text-sm rounded-md p-3 sm:w-48 w-full block text-[#8891B2]"
                    >
                      <Timing />

                      {/* Add more options as needed */}
                    </Field>
                    <span className="text-[#11133D] font-medium">To</span>
                    <Field
                      as="select"
                      value={selectedDayObject?.end_time || ""}
                      name={`service_hours.${day}.end_time`}
                      onChange={(event) =>
                        handleTimeChange(day, "end_time", event.target.value)
                      }
                      className="border-[#CECED7] sm:appearance-auto appearance-none border-2 text-sm rounded-md p-3 sm:w-48 w-full block text-[#8891B2]"
                    >
                      <Timing />

                      {/* Add more options as needed */}
                    </Field>
                  </div>
                </label>
              </div>
            );
          })
        : working_days?.map((selectedDay) => {
            // Find the object in service_hours array corresponding to the selected day
            const selectedDayObject = service_hours?.find(
              (day) => day.day === selectedDay
            );

            return (
              <div key={selectedDay} className="mt-4">
                <label className="flex items-center gap-4 flex-wrap">
                  <span className="text-[#11133D] font-medium min-w-14">
                    {selectedDay}
                  </span>
                  <div className="flex items-center gap-4">
                    <Field
                      as="select"
                      value={selectedDayObject?.start_time || ""}
                      name={`service_hours.${selectedDay}.start_time`}
                      onChange={(event) =>
                        handleTimeChange(
                          selectedDay,
                          "start_time",
                          event.target.value
                        )
                      }
                      className="border-[#CECED7] sm:appearance-auto appearance-none border-2 rounded-md p-3 sm:w-48 w-full block text-[#8891B2]"
                    >
                      <option value="">Select Start Time</option>
                      <option value="00:00">12:00 AM</option>
                      <option value="00:15">12:15 AM</option>
                      <option value="00:30">12:30 AM</option>
                      <option value="00:45">12:45 AM</option>
                      <option value="01:00">1:00 AM</option>
                      <option value="01:15">1:15 AM</option>
                      <option value="01:30">1:30 AM</option>
                      <option value="01:45">1:45 AM</option>
                      <option value="02:00">2:00 AM</option>
                      <option value="02:15">2:15 AM</option>
                      <option value="02:30">2:30 AM</option>
                      <option value="02:45">2:45 AM</option>
                      <option value="03:00">3:00 AM</option>
                      <option value="03:15">3:15 AM</option>
                      <option value="03:30">3:30 AM</option>
                      <option value="03:45">3:45 AM</option>
                      <option value="04:00">4:00 AM</option>
                      <option value="04:15">4:15 AM</option>
                      <option value="04:30">4:30 AM</option>
                      <option value="04:45">4:45 AM</option>
                      <option value="05:00">5:00 AM</option>
                      <option value="05:15">5:15 AM</option>
                      <option value="05:30">5:30 AM</option>
                      <option value="05:45">5:45 AM</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="06:15">6:15 AM</option>
                      <option value="06:30">6:30 AM</option>
                      <option value="06:45">6:45 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="07:15">7:15 AM</option>
                      <option value="07:30">7:30 AM</option>
                      <option value="07:45">7:45 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="08:15">8:15 AM</option>
                      <option value="08:30">8:30 AM</option>
                      <option value="08:45">8:45 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="09:15">9:15 AM</option>
                      <option value="09:30">9:30 AM</option>
                      <option value="09:45">9:45 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="10:15">10:15 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="10:45">10:45 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:15">11:15 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="11:45">11:45 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:15">12:15 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="12:45">12:45 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:15">1:15 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="13:45">1:45 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="14:15">2:15 PM</option>
                      <option value="14:30">2:30 PM</option>
                      <option value="14:45">2:45 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="15:15">3:15 PM</option>
                      <option value="15:30">3:30 PM</option>
                      <option value="15:45">3:45 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="16:15">4:15 PM</option>
                      <option value="16:30">4:30 PM</option>
                      <option value="16:45">4:45 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:15">5:15 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="17:45">5:45 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:15">6:15 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="18:45">6:45 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:15">7:15 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="19:45">7:45 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:15">8:15 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="20:45">8:45 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:15">9:15 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="21:45">9:45 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="22:15">10:15 PM</option>
                      <option value="22:30">10:30 PM</option>
                      <option value="22:45">10:45 PM</option>
                      <option value="23:00">11:00 PM</option>
                      <option value="23:15">11:15 PM</option>
                      <option value="23:30">11:30 PM</option>
                      <option value="23:45">11:45 PM</option>

                      {/* Add more options as needed */}
                    </Field>
                    <span className="text-[#11133D] font-medium">To</span>
                    <Field
                      as="select"
                      value={selectedDayObject?.end_time || ""}
                      name={`service_hours.${selectedDay}.end_time`}
                      onChange={(event) =>
                        handleTimeChange(
                          selectedDay,
                          "end_time",
                          event.target.value
                        )
                      }
                      className="border-[#CECED7] sm:appearance-auto appearance-none border-2 rounded-md p-3 sm:w-48 w-full block text-[#8891B2]"
                    >
                      <option value="">Select End Time</option>
                      <option value="00:00">12:00 AM</option>
                      <option value="00:15">12:15 AM</option>
                      <option value="00:30">12:30 AM</option>
                      <option value="00:45">12:45 AM</option>
                      <option value="01:00">1:00 AM</option>
                      <option value="01:15">1:15 AM</option>
                      <option value="01:30">1:30 AM</option>
                      <option value="01:45">1:45 AM</option>
                      <option value="02:00">2:00 AM</option>
                      <option value="02:15">2:15 AM</option>
                      <option value="02:30">2:30 AM</option>
                      <option value="02:45">2:45 AM</option>
                      <option value="03:00">3:00 AM</option>
                      <option value="03:15">3:15 AM</option>
                      <option value="03:30">3:30 AM</option>
                      <option value="03:45">3:45 AM</option>
                      <option value="04:00">4:00 AM</option>
                      <option value="04:15">4:15 AM</option>
                      <option value="04:30">4:30 AM</option>
                      <option value="04:45">4:45 AM</option>
                      <option value="05:00">5:00 AM</option>
                      <option value="05:15">5:15 AM</option>
                      <option value="05:30">5:30 AM</option>
                      <option value="05:45">5:45 AM</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="06:15">6:15 AM</option>
                      <option value="06:30">6:30 AM</option>
                      <option value="06:45">6:45 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="07:15">7:15 AM</option>
                      <option value="07:30">7:30 AM</option>
                      <option value="07:45">7:45 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="08:15">8:15 AM</option>
                      <option value="08:30">8:30 AM</option>
                      <option value="08:45">8:45 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="09:15">9:15 AM</option>
                      <option value="09:30">9:30 AM</option>
                      <option value="09:45">9:45 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="10:15">10:15 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="10:45">10:45 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:15">11:15 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="11:45">11:45 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:15">12:15 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="12:45">12:45 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:15">1:15 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="13:45">1:45 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="14:15">2:15 PM</option>
                      <option value="14:30">2:30 PM</option>
                      <option value="14:45">2:45 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="15:15">3:15 PM</option>
                      <option value="15:30">3:30 PM</option>
                      <option value="15:45">3:45 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="16:15">4:15 PM</option>
                      <option value="16:30">4:30 PM</option>
                      <option value="16:45">4:45 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:15">5:15 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="17:45">5:45 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:15">6:15 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="18:45">6:45 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:15">7:15 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="19:45">7:45 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:15">8:15 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="20:45">8:45 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:15">9:15 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="21:45">9:45 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="22:15">10:15 PM</option>
                      <option value="22:30">10:30 PM</option>
                      <option value="22:45">10:45 PM</option>
                      <option value="23:00">11:00 PM</option>
                      <option value="23:15">11:15 PM</option>
                      <option value="23:30">11:30 PM</option>
                      <option value="23:45">11:45 PM</option>

                      {/* Add more options as needed */}
                    </Field>
                  </div>
                </label>
              </div>
            );
          })}
    </div>
  );
};

export default ServiceHours;
