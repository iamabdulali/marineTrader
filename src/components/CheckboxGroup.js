// CheckboxGroup.js
import React from "react";
import { Field } from "formik";

const CheckboxGroup = ({
  facilities,
  className,
  name,
  checkedProp,
  onChangeProp,
}) => {
  const handleCheckboxChange = (facility) => {
    onChangeProp && onChangeProp(facility);
  };

  return (
    <div className={`${className} text-sm font-medium text-[#11133D] mt-7`}>
      {Object.keys(facilities).map((facility) => (
        <div key={facility}>
          <label className="flex text-[#11133D]">
            <Field
              className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
              type="checkbox"
              name={name}
              value={facility}
              checked={checkedProp ? facilities[facility].selected : undefined}
              onChange={() => handleCheckboxChange(facility)}
            />
            {facility}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
