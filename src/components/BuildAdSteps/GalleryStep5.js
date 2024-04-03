import React, { useContext } from "react";
import BuildLayout from "./BuildLayout";
import { Field } from "formik";
import ImageAndVideoHandler from "./ImageAndVideoHandler";
import { AuthContext } from "../../Context/AuthContext";

const GalleryStep5 = ({ isEditMode }) => {
  const { selectedPackage } = useContext(AuthContext);

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
          maxFiles={5} // Set the maximum number of files
        />
      </BuildLayout>
      {selectedPackage != "Standard" ? (
        <BuildLayout heading="Video">
          <Field
            uploadingText="Video"
            name="video"
            component={ImageAndVideoHandler}
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
