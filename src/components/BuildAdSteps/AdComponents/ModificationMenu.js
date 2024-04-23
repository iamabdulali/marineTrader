import { Menu } from "@headlessui/react";
import { Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ModificationMenu = ({
  menuLabel,
  MenuFor,
  dispatch,
  actionType,
  name,
  isEditMode,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const [newCheckboxText, setNewCheckboxText] = useState(menuLabel);
  const [editedCheckboxIndex, setEditedCheckboxIndex] = useState(null);

  useEffect(() => {
    // setNewCheckboxText(`${menuLabel} ${MenuFor.length + 1}`);
    setNewCheckboxText(``);
  }, [MenuFor]);

  const handleAddCheckbox = () => {
    // if (newCheckboxText.trim() !== "") {
    dispatch({
      type: actionType,
      payload: [...MenuFor, newCheckboxText],
    });
    // setNewCheckboxText(`${menuLabel} ${MenuFor.length + 2}`);
    setNewCheckboxText(``);
    // }
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

  const handleInputChange = (e) => {
    const { name, checked, value } = e.target;
    const valueToModify = values?.advert?.[name];

    if (checked) {
      // Checkbox is checked, add value to the array
      const updatedFeatures = [
        ...valueToModify,
        {
          id: valueToModify.length + 1,
          name: value,
          pivot: {
            advert_id: values?.advert?.id,
            modification_id: valueToModify.length + 1,
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setFieldValue(`advert.${name}`, updatedFeatures);
    } else {
      // Checkbox is unchecked, remove value from the array
      const updatedFeatures = valueToModify.filter(
        (item) => item.name !== value
      );
      setFieldValue(`advert.${name}`, updatedFeatures);
    }
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
            {...(isEditMode && {
              checked: values?.advert?.[name].some(
                (item) => item.name === checkbox
              ),
              onChange: (e) => handleInputChange(e),
            })}
          />
          {editedCheckboxIndex === index ? (
            <input
              type="text"
              placeholder="Write Here..."
              className="text-sm w-full text-[#11133D] font-medium ml-3"
              value={checkbox}
              onChange={(e) => handleCheckboxTextChange(index, e.target.value)}
              onBlur={finishEditingCheckboxText}
              autoFocus
            />
          ) : (
            <div
              className="text-sm text-[#11133D] min-h-5 w-full border-b-2 font-medium ml-3"
              onClick={() => startEditingCheckboxText(index)}
            >
              {checkbox == "" ? "Write Here..." : checkbox}
            </div>
          )}
        </div>
      ))}

      <p
        className="cursor-pointer w-fit text-sm text-[#0D1A8B] font-medium underline flex items-center gap-3"
        onClick={() => {
          handleAddCheckbox();
          startEditingCheckboxText(MenuFor.length);
        }}
      >
        <FaPlus /> Add New
      </p>
    </Menu.Items>
  );
};

export default ModificationMenu;
