import React, { useEffect } from "react";
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
  isEditMode,
  ...props
}) => {
  const [, , helpers] = useField(field.name);
  const { values } = useFormikContext();
  const { advert } = Object(values);
  const [imagePreviews, setImagePreviews] = React.useState([]);

  useEffect(() => {
    // Fetch images from the backend if in edit mode
    if (isEditMode) {
      const { advert } = Object(values);
      const { images } = advert;
      if (images && images.length > 0) {
        const imagePreviews = images.map((image) => {
          if (image instanceof File) {
            // If image is a File object, create object URL
            return URL.createObjectURL(image);
          } else if (typeof image === "object" && image.image) {
            // If image is a URL object, use the URL directly
            return image.image;
          } else {
            // Handle other cases where `images` contains URLs directly
            return image;
          }
        });
        setImagePreviews(imagePreviews);
      }
    } else {
      // Initialize previews from Formik values if not in edit mode
      if (values.images && values.images.length > 0) {
        const imagePreviews = values.images.map((image) => {
          if (image instanceof File) {
            return URL.createObjectURL(image);
          } else {
            // Handle the case where `values.images` contains URLs directly
            return image;
          }
        });
        setImagePreviews(imagePreviews);
      }
    }
  }, [isEditMode, values]);

  const handleChange = (event) => {
    const { setFieldValue } = form;
    const files = event.currentTarget.files;

    if (files.length + imagePreviews.length > maxFiles) {
      // Limiting the number of files to maxFiles
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    if (files.length > 0) {
      let newImagePreviews = [...imagePreviews];
      let accumulatedFiles = [];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          // Check if the file is not already present in the existing images
          if (!imagePreviews.find((preview) => preview === file.name)) {
            newImagePreviews.push(URL.createObjectURL(file));
            accumulatedFiles.push(file);
          }
        }
      });

      setImagePreviews(newImagePreviews);

      if (isEditMode) {
        // If in edit mode, merge the new files with the existing images fetched from the backend
        const existingImages = Object(advert).images || [];
        accumulatedFiles = [...existingImages, ...accumulatedFiles];
        setFieldValue("advert.images", accumulatedFiles);
      } else {
        // If not in edit mode, update Formik values with the accumulatedFiles
        const accumulatedFiles = [...(form.values[field.name] || []), ...files];
        setFieldValue(field.name, accumulatedFiles);
      }
    }
  };

  const handleDelete = (index, type) => {
    let updatedPreviews = [];

    if (type === "image") {
      updatedPreviews = [...imagePreviews];
      updatedPreviews.splice(index, 1);
      setImagePreviews(updatedPreviews);

      if (isEditMode && advert.images) {
        const updatedImages = advert.images.filter(
          (image, idx) => idx !== index
        );
        form.setFieldValue("advert.images", updatedImages);
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
          {imagePreviews.map((preview, index) => {
            return (
              <div
                key={`image-${index}`}
                className="relative smallLg:w-1/5 sm:w-1/3 w-full min-h-[154px] max-h-[154px] mt-5"
              >
                <img
                  src={preview}
                  alt={`Image ${index + 1}`}
                  className="object-cover rounded-lg w-full min-h-[154px] max-h-[154px]"
                />

                {/* {isEditMode && ( */}
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                  onClick={() => handleDelete(index, "image")}
                >
                  <FaTimes color="#FF4A6B" />
                </button>
                {/* )} */}
              </div>
            );
          })}
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

export default ImageAndVideoHandler;
