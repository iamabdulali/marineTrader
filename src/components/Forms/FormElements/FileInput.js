import React, { useState, useEffect } from "react";
import { ErrorMessage, useField } from "formik";
import { FaPlus, FaTimes } from "react-icons/fa";

const FileInput = ({ fieldName, form, label, furtherStyles, ...props }) => {
  const [, , helpers] = useField(fieldName);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    // Check if form.values[fieldName] already has a file object
    if (form.values[fieldName] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(form.values[fieldName]);
    }
  }, [form.values[fieldName]]);

  const handleChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    form.setFieldValue(fieldName, selectedFile);

    // Update image preview
    if (selectedFile) {
      setIsImageUploaded(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <p className="text-[#11133D] font-semibold mb-3">{label}</p>
        <div className="border-2 relative border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full rounded-lg max-w-[160px] min-w-[160px] min-h-[160px] max-h-[160px]">
          <FaPlus
            size={40}
            color="#0D1A8B"
            className={`${isImageUploaded ? "hidden" : "block"}`}
          />
          <input
            style={{ opacity: "0", inset: "0", position: "absolute" }}
            type="file"
            onChange={handleChange}
            className="absolute bg-slate-500 inset-0 cursor-pointer"
            {...props}
          />
        </div>
        <ErrorMessage
          name={fieldName}
          component="div"
          className="text-red-500"
        />

        {imagePreview && (
          <div className={`absolute  ${furtherStyles} w-fit`}>
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover top-3 rounded-lg max-w-[160px] min-w-[160px] min-h-[160px] max-h-[160px] mt-5 object-top"
            />
            <FaTimes
              onClick={() => {
                setImagePreview(null);
                setIsImageUploaded(false);
                form.setFieldValue(fieldName, "");
              }}
              color="#FF4A6B"
              size={24}
              className="absolute cursor-pointer top-7 right-2 bg-white rounded-full p-1"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
