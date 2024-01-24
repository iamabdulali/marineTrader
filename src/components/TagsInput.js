import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export const TagsInput = ({ field, form }) => {
  const [tags, setTags] = useState([]);

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags((prevTags) => {
          const updatedTags = [...prevTags, newTag];
          form.setFieldValue(field.name, updatedTags);
          return updatedTags;
        });
        // Delay clearing the input to ensure state is updated
        setTimeout(() => {
          e.target.value = "";
        }, 0);
      }
    }
  };

  console.log(tags);

  const handleTagRemoval = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setFieldValue(field.name, updatedTags);
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
        type="text"
        placeholder={`Enter Tags`}
        onKeyDown={handleTagInput}
        className="border-[#CECED7] mb-4 text-[#8891B2] border-2 rounded-md p-3 w-full"
      />
      <div className="flex items-center gap-5 flex-wrap">
        {tags.map((tag, index) => (
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
