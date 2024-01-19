import React from "react";
import { ErrorMessage, useField } from "formik";
import { cloud } from "../../../assets";

const FileInput = ({ field, form, label, ...props }) => {
  const [, , helpers] = useField(field.name);

  const handleChange = (event) => {
    const { setFieldValue } = form;
    setFieldValue(field.name, event.currentTarget.files[0]);
  };

  return (
    <div className="w-full relative">
      <p className="text-[#11133D] font-semibold mb-3">{label}</p>
      <div className="border-2 relative rounded border-[#0D1A8B] border-dashed flex flex-col items-center justify-center w-full p-8">
        <p className="flex items-end mb-3 w-full justify-center">
          <img src={cloud} alt="upload" className="w-6 mr-3" /> Drag & drop or{" "}
          <span className="text-[#0D1A8B] font-medium ml-1 underline">
            {" "}
            Upload Here
          </span>
        </p>
        <p className="w-full text-center">JPEG/PNG size 160*160 pixels</p>
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
    </div>
  );
};

export default FileInput;
