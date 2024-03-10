import { Menu } from "@headlessui/react";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ModificationMenu = ({
  menuLabel,
  MenuFor,
  dispatch,
  actionType,
  name,
}) => {
  const [newCheckboxText, setNewCheckboxText] = useState(menuLabel);
  const [editedCheckboxIndex, setEditedCheckboxIndex] = useState(null);

  useEffect(() => {
    setNewCheckboxText(`${menuLabel} ${MenuFor.length + 1}`);
  }, [MenuFor]);

  const handleAddCheckbox = () => {
    if (newCheckboxText.trim() !== "") {
      dispatch({
        type: actionType,
        payload: [...MenuFor, newCheckboxText],
      });
      setNewCheckboxText(`${menuLabel} ${MenuFor.length + 2}`);
    }
  };

  const handleCheckboxTextChange = (index, newText) => {
    const updatedCheckboxes = [...MenuFor];
    updatedCheckboxes[index] = newText;
    dispatch({ type: actionType, payload: updatedCheckboxes });
  };

  const startEditingCheckboxText = (index) => {
    setEditedCheckboxIndex(index);
  };

  const finishEditingCheckboxText = () => {
    setEditedCheckboxIndex(null);
  };

  return (
    <Menu.Items className="absolute bg-white custom-shadow rounded-lg p-4 w-full max-h-[200px] overflow-y-auto">
      {MenuFor.map((checkbox, index) => (
        <div
          key={index}
          className="flex items-center mb-4"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          onMouseOver={(e) => e.stopPropagation()}
        >
          <Field
            type="checkbox"
            className="w-[20px] h-[20px]"
            name={name}
            value={checkbox}
          />
          {editedCheckboxIndex === index ? (
            <input
              type="text"
              className="text-sm w-full text-[#11133D] font-medium ml-3"
              value={checkbox}
              onChange={(e) => handleCheckboxTextChange(index, e.target.value)}
              onBlur={finishEditingCheckboxText}
              autoFocus
            />
          ) : (
            <div
              className="text-sm text-[#11133D] font-medium ml-3"
              onClick={() => startEditingCheckboxText(index)}
            >
              {checkbox}
            </div>
          )}
        </div>
      ))}

      <p
        className="cursor-pointer w-fit text-sm text-[#0D1A8B] font-medium underline flex items-center gap-3"
        onClick={handleAddCheckbox}
      >
        <FaPlus /> Add New
      </p>
    </Menu.Items>
  );
};

export default ModificationMenu;
