import React from "react";
import BuildLayout from "./BuildLayout";
import { Field, useFormikContext } from "formik";
import ImageAndVideoHandler from "./ImageAndVideoHandler";
import VideoHandler from "./VideoHandler";

const GalleryStep5 = ({ isEditMode, packages }) => {
  const { values } = useFormikContext();

  const { advert } = Object(values);

  const { advert_package_id } = Object(advert);

  let currentPackage = isEditMode ? advert_package_id : values?.advert_package;
  let numberToSubtract = currentPackage > 4 ? 4 : 0;

  let selectedPackage = currentPackage - numberToSubtract;

  console.log(selectedPackage);

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
      {selectedPackage == "0" || selectedPackage == "1" ? (
        ""
      ) : (
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
      )}
    </>
  );
};

export default GalleryStep5;
