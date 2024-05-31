export const handleFileUpload = (
  type,
  e,
  setFieldValue,
  setCoverPhotoSrc,
  setProfilePhotoSrc,
  isPrivateSeller
) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "cover") {
        setCoverPhotoSrc(reader.result);
        setFieldValue("user.company_logo", file);
        console.log(reader);
      } else if (type === "profile") {
        setProfilePhotoSrc(reader.result);
        setFieldValue(
          `${isPrivateSeller ? "user.image_field" : "user.main_picture"}`,
          file
        );
      }
    };
    reader.readAsDataURL(file);
  }
};
