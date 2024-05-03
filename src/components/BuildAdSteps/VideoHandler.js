import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const VideoHandler = ({
  field,
  form,
  label,
  accept,
  maxFiles,
  uploadingText,
  isEditMode,
  ...props
}) => {
  const [, , helpers] = useField(field.name);
  const { values } = useFormikContext();
  const { advert } = Object(values);
  const [videoPreview, setVideoPreview] = useState(null);
  const [deletedVideoId, setDeletedVideoId] = useState(null);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Fetch video from the backend if in edit mode
    if (isEditMode) {
      const { advert } = Object(values);
      const { video } = advert;
      if (video) {
        if (video instanceof Blob || video instanceof File) {
          setVideoPreview(URL.createObjectURL(video));
        } else if (typeof video === "string") {
          // Assuming video is already a URL
          setVideoPreview(video);
        } else {
          setVideoPreview(video.video);
        }
      }
    } else {
      if (
        values.video &&
        values.video.length > 0 &&
        values.video[0] instanceof File
      ) {
        setVideoPreview(URL.createObjectURL(values.video[0]));
      }
    }
  }, [isEditMode, values]);

  const handleChange = (event) => {
    const { setFieldValue } = form;
    const file = event.currentTarget.files[0];

    if (file) {
      if (file instanceof File) {
        setVideoPreview(URL.createObjectURL(file));
        if (isEditMode) {
          // If in edit mode, update Formik values with the new file
          setFieldValue("advert.video", file);
        } else {
          setFieldValue("video", file);
        }
      } else {
        alert("Please select a valid video file.");
      }
    }
  };

  const handleDelete = () => {
    setVideoPreview(null);

    if (isEditMode && advert.video) {
      setDeletedVideoId(advert.video.id);
      form.setFieldValue("advert.video", null); // Remove the video field
    } else {
      form.setFieldValue(field.name, null);
    }
  };

  useEffect(() => {
    dispatch({
      type: "DELETED_VIDEO_ID",
      payload: deletedVideoId,
    });
  }, [advert]);

  return (
    <>
      <div className="w-full relative">
        <p className="text-[#11133D] font-semibold mb-3">{label}</p>

        {/* Render video preview */}
        {videoPreview && (
          <div className="relative smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px] mt-5">
            <video
              className="object-cover rounded-lg w-full min-h-[154px] max-h-[154px]"
              controls
            >
              <source src={videoPreview}></source>
            </video>
            {/* Render delete button */}
            <button
              type="button"
              className="absolute top-2 right-2 bg-white rounded-full p-1"
              onClick={handleDelete}
            >
              <FaTimes color="#FF4A6B" />
            </button>
          </div>
        )}

        {/* Render upload button */}
        {!videoPreview && (
          <div className="border-2 relative rounded mt-5 border-[#0D1A8B] border-dashed flex items-center justify-center smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px]">
            <FaPlus size={60} color="#0D1A8B" />
            <input
              style={{ opacity: "0", inset: "0", position: "absolute" }}
              type="file"
              onChange={handleChange}
              accept={accept || "video/*"}
              className="absolute bg-slate-500 inset-0 cursor-pointer"
              {...props}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default VideoHandler;
