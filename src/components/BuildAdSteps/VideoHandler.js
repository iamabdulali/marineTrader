import React, { useEffect } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaPlus, FaTimes } from "react-icons/fa";

const VideoHandler = ({
  field,
  form,
  label,
  accept,
  allowMultiple,
  maxFiles,
  uploadingText,
  isEditMode,
  ...props
}) => {
  const [, , helpers] = useField(field.name);
  const { values } = useFormikContext();
  const { advert } = Object(values);
  const [videoPreviews, setVideoPreviews] = React.useState([]);

  useEffect(() => {
    // Fetch video from the backend if in edit mode
    if (isEditMode) {
      const { advert } = Object(values);
      const { video } = advert;
      if (video) {
        setVideoPreviews([URL.createObjectURL(video[0])]);
      } else if (video && typeof video === "string") {
        // Assuming video is already a URL
        setVideoPreviews([video]);
      }
    } else {
      if (
        values.video &&
        values.video.length > 0 &&
        values.video[0] instanceof File
      ) {
        setVideoPreviews([URL.createObjectURL(values.video[0])]);
      }
    }
  }, [isEditMode, values]);

  const handleChange = (event) => {
    const { setFieldValue } = form;
    const files = event.currentTarget.files;

    if (files.length + videoPreviews.length > maxFiles) {
      // Limiting the number of files to maxFiles
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    if (files.length > 0) {
      let newVideoPreviews = [...videoPreviews];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("video/")) {
          newVideoPreviews.push(URL.createObjectURL(file));
        }
      });

      setVideoPreviews(newVideoPreviews);

      if (isEditMode) {
        // If in edit mode, update Formik values with the accumulatedFiles
        const accumulatedFiles = [...(form.values[field.name] || []), ...files];
        setFieldValue("advert.video", accumulatedFiles);
      } else {
        const accumulatedFiles = [...(form.values[field.name] || []), ...files];
        setFieldValue("video", accumulatedFiles);
      }
    }
  };

  const handleDelete = (index, type) => {
    let updatedPreviews = [];

    if (type === "video") {
      updatedPreviews = [...videoPreviews];
      updatedPreviews.splice(index, 1);
      setVideoPreviews(updatedPreviews);

      if (isEditMode && advert.video) {
        form.setFieldValue("advert.video", null); // Remove the video field
      }
    }

    if (!isEditMode) {
      const files = form.values[field.name];
      const newFiles = Array.from(files);
      newFiles.splice(index, 1);
      form.setFieldValue(field.name, newFiles);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <p className="text-[#11133D] font-semibold mb-3">{label}</p>

        {/* Render image and video previews */}
        {/* {imagePreviews.concat(videoPreviews).length > 0 ? ( */}
        <div className="flex smallLg:flex-nowrap flex-wrap justify-start gap-7">
          {videoPreviews.map((preview, index) => (
            <div
              key={`video-${index}`}
              className="relative smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px] mt-5"
            >
              <video className="object-cover rounded-lg w-full min-h-[154px] max-h-[154px]">
                <source src={preview}></source>
              </video>

              {/* {isEditMode && ( */}
              <button
                type="button"
                className="absolute top-2 right-2 bg-white rounded-full p-1"
                onClick={() => handleDelete(index, "video")}
              >
                <FaTimes color="#FF4A6B" />
              </button>
              {/* )} */}
            </div>
          ))}
        </div>
        {/* ) : ( */}
        <>
          <div className="border-2 relative rounded mt-5 border-[#0D1A8B] border-dashed flex items-center justify-center smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px]">
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
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default VideoHandler;
