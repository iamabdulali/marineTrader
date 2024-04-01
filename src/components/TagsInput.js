import { useContext, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useFormikContext } from "formik";

export const TagsInput = ({ field, form, isEditMode }) => {
  const [tags, setTags] = useState([]);
  const { listingTags, dispatch } = useContext(AuthContext);

  const { values } = useFormikContext();
  const { advert } = Object(values);

  const { tags: oldTags } = Object(advert);

  useEffect(() => {
    // Set the tags array when the listingTags change
    setTags(listingTags);
  }, [listingTags]);

  const handleTagInput = (e) => {
    const inputValue = e.target.value.trim();
    if (isEditMode) {
      form.setFieldValue(`advert.tags`, inputValue);
    }
    // form.setFieldValue(field.name, inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags((prevTags) => {
          const updatedTags = [...prevTags, newTag];
          form.setFieldValue(field.name, updatedTags);
          return updatedTags;
        });
        dispatch({ type: "ADD_TAG", payload: newTag });
        // Delay clearing the input to ensure state is updated
        setTimeout(() => {
          e.target.value = "";
        }, 10);
      }
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setFieldValue(field.name, updatedTags);
    dispatch({ type: "REMOVE_TAG", payload: tagToRemove });
  };

  return (
    <div className="text-sm mt-4">
      <label
        htmlFor={field.name}
        className="block text-[#11133D] text-sm font-medium mb-2"
      >
        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
      </label>
      <input
        // {...field}
        type="text"
        placeholder={`Enter Tags`}
        // value={field.value} // Set the value to the field value
        onChange={handleTagInput}
        onKeyDown={handleKeyDown}
        className="border-[#CECED7] mb-4 text-[#8891B2] border-2 rounded-md p-3 w-full"
      />
      <div className="flex items-center gap-5 flex-wrap">
        {isEditMode
          ? oldTags?.map(({ name, id }) => (
              <span
                key={id}
                className="tag bg-white flex items-center gap-2 justify-between w-max text-[#3B3B3B] border-[1px]  border-[#d6d6d6] rounded-lg py-2 px-3"
              >
                {name}
                <FaTimes onClick={() => handleTagRemoval(name)} />
              </span>
            ))
          : tags.map((tag, index) => (
              <span
                key={index}
                className="tag bg-white flex items-center gap-2 justify-between w-max text-[#3B3B3B] border-[1px]  border-[#d6d6d6] rounded-lg py-2 px-3"
              >
                {tag}
                <FaTimes onClick={() => handleTagRemoval(tag)} />
              </span>
            ))}
      </div>
    </div>
  );
};
