import React from "react";
import { ErrorMessage, useField } from "formik";
import { cloud } from "../../assets";

const ImageAndVideoHandler = ({
  field,
  form,
  label,
  accept,
  allowMultiple,
  maxFiles,
  uploadingText,
  ...props
}) => {
  const [, , helpers] = useField(field.name);

  const handleChange = (event) => {
    const { setFieldValue } = form;

    // If multiple files are allowed, set the field value to an array of files
    if (allowMultiple) {
      setFieldValue(field.name, event.currentTarget.files);
    } else {
      // Otherwise, only take the first file from the array
      setFieldValue(field.name, event.currentTarget.files[0]);
    }
  };

  return (
    <div className="w-full relative">
      <p className="text-[#11133D] font-semibold mb-3">{label}</p>
      <div className="border-2 relative rounded border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full py-20">
        <p className="flex items-end text-[#8891B2]  mb-3 w-full justify-center">
          <img src={cloud} alt="upload" className="w-6 mr-3" /> Drag & drop{" "}
          {uploadingText}{" "}
          <span className="text-[#0D1A8B] font-medium ml-1 underline">
            {" "}
            Or Upload Here
          </span>
        </p>
        <p className="w-full text-center text-[#8891B2] text-sm">
          {allowMultiple
            ? `JPEG/PNG size, 160*160 pixels`
            : `MP4/MOV size 1000mb`}
        </p>
        <input
          style={{ opacity: "0", inset: "0", position: "absolute" }}
          type="file"
          onChange={handleChange}
          accept={
            accept ||
            (allowMultiple
              ? "image/jpeg, image/png, video/*"
              : "image/jpeg, image/png, video/*")
          }
          multiple={allowMultiple}
          className="absolute bg-slate-500 inset-0 cursor-pointer"
          {...props}
        />
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
};

export default ImageAndVideoHandler;
