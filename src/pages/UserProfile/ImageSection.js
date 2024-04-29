import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { cameraIcon } from "../../assets";

const ImageSection = ({
  isPrivateSeller,
  company_logo,
  main_picture,
  image_field,
  setFieldValue,
}) => {
  const [coverPhotoSrc, setCoverPhotoSrc] = useState(null);
  const [profilePhotoSrc, setProfilePhotoSrc] = useState(null);
  const handleFileUpload = (type, e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setCoverPhotoSrc(reader.result);
          setFieldValue("user.main_picture", file);
        } else if (type === "profile") {
          setProfilePhotoSrc(reader.result);
          setFieldValue(
            `${isPrivateSeller ? "user.image_field" : "user.company_logo"}`,
            file
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="smallLg:w-4/12  w-full bg-[#EDF1FE] smallLg:rounded-tl-lg smallLg:rounded-bl-lg smallLg:mb-0 mb-4">
      {isPrivateSeller ? (
        ""
      ) : (
        <div className="relative">
          <img
            src={coverPhotoSrc || main_picture}
            className="min-h-[270px] smallLg:max-h-[270px] max-h-[450px] w-full object-cover"
          />
          <label
            htmlFor="coverPhotoInput"
            className="flex items-center absolute top-5 right-5 gap-2 underline text-[#fff] cursor-pointer"
          >
            <FaPencilAlt />
            Edit
          </label>
          <input
            type="file"
            id="coverPhotoInput"
            accept="image/*"
            name="main_picture"
            onChange={(e) => handleFileUpload("cover", e, setFieldValue)}
            className="hidden"
          />
        </div>
      )}

      <div
        className={`relative ${
          isPrivateSeller ? "top-10" : "-top-20"
        }  w-40 mx-auto`}
      >
        <img
          src={profilePhotoSrc || image_field || company_logo}
          alt="Profile Photo"
          className="rounded-full w-40 h-40 object-cover object-top border-4 border-[#CDD0F0]"
        />
        <label
          htmlFor="profilePhotoInput"
          className="absolute w-14 bottom-0 right-0 cursor-pointer"
        >
          <img src={cameraIcon} alt="camera-icon" />
        </label>
        <input
          type="file"
          id="profilePhotoInput"
          accept="image/*"
          name={`${isPrivateSeller ? "image_field" : "company_logo"}`}
          onChange={(e) => handleFileUpload("profile", e, setFieldValue)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageSection;
