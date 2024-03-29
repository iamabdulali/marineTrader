import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaPlus, FaTimes } from "react-icons/fa";

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
  const [previews, setPreviews] = React.useState([]);
  const [fileType, setFileType] = React.useState("");
  const { values } = useFormikContext();

  const handleChange = (event) => {
    const { setFieldValue } = form;
    const files = event.currentTarget.files;

    if (files.length + previews.length > maxFiles) {
      // Limiting the number of files to maxFiles
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    if (files.length > 0) {
      const newPreviews = [];
      let videoFile = null;

      // Separate videos from images
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          newPreviews.push(URL.createObjectURL(file));
        } else if (!videoFile && file.type.startsWith("video/")) {
          videoFile = file;
        }
      });

      if (videoFile) {
        // If a video is selected, set the video file separately
        setFileType(videoFile.type);
        setPreviews([URL.createObjectURL(videoFile)]);
        setFieldValue(field.name, videoFile);
      } else {
        // If no video is selected, append images to previews array
        setPreviews([...previews, ...newPreviews]);

        // Accumulate selected image files in an array
        const accumulatedFiles = [...(form.values[field.name] || []), ...files];
        setFieldValue(field.name, accumulatedFiles);
      }
    }
    console.log(values.images, values.video);
  };
  const handleDelete = (index) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);

    const files = form.values[field.name];
    const newFiles = Array.from(files);
    newFiles.splice(index, 1);
    form.setFieldValue(field.name, newFiles);
  };

  return (
    <>
      <div className="w-full relative">
        <p className="text-[#11133D] font-semibold mb-3">{label}</p>

        {previews.length > 0 ? (
          <div className="flex smallLg:flex-nowrap flex-wrap justify-start gap-7">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px] mt-5"
              >
                {fileType == "video/mp4" ? (
                  <video className="object-cover rounded-lg w-full min-h-[154px] max-h-[154px]">
                    <source src={preview}></source>
                  </video>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover rounded-lg w-full min-h-[154px] max-h-[154px]"
                  />
                )}

                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                  onClick={() => handleDelete(index)}
                >
                  <FaTimes color="#FF4A6B" />
                </button>
              </div>
            ))}
            <div className="border-2 relative rounded mt-5 border-[#0D1A8B] border-dashed flex items-center justify-center smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px]">
              {/* <p className="flex items-end text-[#8891B2]  mb-3 w-full justify-center">
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
          </p> */}
              <FaPlus size={60} color="#0D1A8B" />
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
          </div>
        ) : (
          <>
            <div className="border-2 relative rounded mt-5 border-[#0D1A8B] border-dashed flex items-center justify-center smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px]">
              {/* <p className="flex items-end text-[#8891B2]  mb-3 w-full justify-center">
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
          </p> */}
              <FaPlus size={60} color="#0D1A8B" />
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
              className="text-red-500 mt-2"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImageAndVideoHandler;
