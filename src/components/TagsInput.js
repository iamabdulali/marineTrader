import { useContext, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useFormikContext } from "formik";

export const TagsInput = ({ field, form, isEditMode }) => {
  const [tags, setTags] = useState([]);
  const { listingTags, dispatch } = useContext(AuthContext);

  const { values, setFieldValue } = useFormikContext();
  const { advert } = Object(values);

  useEffect(() => {
    // Set the tags array when the listingTags change
    setTags(listingTags);
  }, [listingTags]);

  const handleTagInput = (e) => {
    const inputValue = e.target.value.trim();
    form.setFieldValue(field.name, inputValue);
  };

  function generateUniqueId(maxId) {
    return maxId + 1;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        if (isEditMode) {
          const valuesToModify = advert?.tags;
          const id = valuesToModify.reduce(
            (max, item) => Math.max(max, item.id),
            0
          );

          const updatedFeatures = [
            ...valuesToModify,
            {
              id: generateUniqueId(id),
              name: newTag,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              pivot: { advert_id: advert?.id, tag_id: generateUniqueId(id) },
            },
          ];
          setFieldValue(`advert.tags`, updatedFeatures);
        } else {
          setTags((prevTags) => {
            const updatedTags = [...prevTags, newTag];
            form.setFieldValue(field.name, updatedTags);
            return updatedTags;
          });
          dispatch({ type: "ADD_TAG", payload: newTag });
        }
        // setTimeout(() => {
        //   e.target.value = "";
        // }, 10);
      }
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    if (isEditMode) {
      const valuesToModify = advert?.tags;
      const updatedTags = valuesToModify.filter(
        (item) => item.name !== tagToRemove
      );
      setFieldValue(`advert.tags`, updatedTags);
    } else {
      const updatedTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(updatedTags);
      form.setFieldValue(field.name, updatedTags);
      dispatch({ type: "REMOVE_TAG", payload: tagToRemove });
    }
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
          ? advert?.tags.map(({ name, id }) => (
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
