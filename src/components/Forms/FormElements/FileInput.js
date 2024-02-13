import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import { cloud } from "../../../assets";
import { FaPlus, FaTimes } from "react-icons/fa";

const FileInput = ({ field, form, label, ...props }) => {
  const [, , helpers] = useField(field.name);
  const [imagePreview, setImagePreview] = useState(null);
  const { setFieldValue } = form;

  const handleChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    setFieldValue(field.name, selectedFile);

    // Update image preview
    if (selectedFile) {
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
        <div className="border-2 relative  border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full  rounded-lg max-w-[160px] min-w-[160px] min-h-[160px] max-h-[160px]">
          {/* <p className="flex items-end mb-3 w-full justify-center">
            <img src={cloud} alt="upload" className="w-6 mr-3" /> Drag & drop or{" "}
            <span className="text-[#0D1A8B] font-medium ml-1 underline">
              {" "}
              Upload Here
            </span>
          </p>
          <p className="w-full text-center">JPEG/PNG size 160*160 pixels</p> */}
          <FaPlus size={40} color="#0D1A8B" />
          <input
            style={{ opacity: "0", inset: "0", position: "absolute" }}
            type="file"
            onChange={handleChange}
            className="absolute bg-slate-500 inset-0 cursor-pointer"
            {...props}
          />
        </div>
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-500"
        />

        {imagePreview ? (
          <div className="absolute top-3 w-fit">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover top-3 rounded-lg max-w-[160px] min-w-[160px] min-h-[160px] max-h-[160px] mt-5 object-top"
            />
            <FaTimes
              onClick={() => {
                setImagePreview(null);
                setFieldValue(field.name, "");
              }}
              color="#FF4A6B"
              size={24}
              className="absolute cursor-pointer top-7 right-2 bg-white rounded-full p-1"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FileInput;
