import React, { useContext, useEffect, useState } from "react";
import BuildLayout from "./BuildLayout";
import { Field } from "formik";
import ImageAndVideoHandler from "./ImageAndVideoHandler";
import { AuthContext } from "../../Context/AuthContext";
import VideoHandler from "./VideoHandler";
import { getPackages } from "../../utils/fetch/fetchData";

const GalleryStep5 = ({ isEditMode }) => {
  const { selectedPackage, user } = useContext(AuthContext);
  const { seller_type } = Object(user);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages(setPackages, seller_type);
  }, []);

  const totalPhotos = packages[selectedPackage]?.max_photo;

  return (
    <>
      {" "}
      <BuildLayout heading="Images">
        <Field
          uploadingText="Upto 5 Photos"
          name="images"
          isEditMode={isEditMode}
          component={ImageAndVideoHandler}
          accept="image/jpeg, image/png" // You can customize the accepted file types
          allowMultiple={true} // Set to true if you want to allow multiple files
          maxFiles={totalPhotos} // Set the maximum number of files
        />
      </BuildLayout>
      {selectedPackage == "2" || selectedPackage == "3" ? (
        <BuildLayout heading="Video">
          <Field
            uploadingText="Video"
            name="video"
            isEditMode={isEditMode}
            component={VideoHandler}
            accept="video/*" // You can customize the accepted file types
            allowMultiple={false} // Set to true if you want to allow multiple files
            maxFiles={1} // Set the maximum number of files
          />
        </BuildLayout>
      ) : (
        ""
      )}
    </>
  );
};

export default GalleryStep5;
