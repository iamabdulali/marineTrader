import React from "react";
import BuildLayout from "./BuildLayout";
import { ErrorMessage, Field } from "formik";
import FileInput from "../Forms/FormElements/FileInput";
import ImageAndVideoHandler from "./ImageAndVideoHandler";

const GalleryStep5 = () => {
  return (
    <>
      {" "}
      <BuildLayout heading="Images">
        <Field
          uploadingText="Upto 5 Photos"
          name="buildAdImages"
          component={ImageAndVideoHandler}
          accept="image/jpeg, image/png" // You can customize the accepted file types
          allowMultiple={true} // Set to true if you want to allow multiple files
          maxFiles={5} // Set the maximum number of files
        />
        {/* <ErrorMessage
          name="buildAdImages"
          component="div"
          className="text-red-500"
        /> */}
      </BuildLayout>
      <BuildLayout heading="Video">
        <Field
          uploadingText="Video"
          name="buildAdVideo"
          component={ImageAndVideoHandler}
          accept="video/*" // You can customize the accepted file types
          allowMultiple={false} // Set to true if you want to allow multiple files
          maxFiles={1} // Set the maximum number of files
        />
        {/* <ErrorMessage
          name="buildAdVideo"
          component="div"
          className="text-red-500"
        /> */}
      </BuildLayout>
    </>
  );
};

export default GalleryStep5;
