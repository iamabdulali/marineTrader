import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingWrapper = ({ loading, children }) => {
  return loading ? (
    <Oval
      secondaryColor="#8891B2"
      color="#0D1A8B"
      wrapperClass="justify-center items-center min-h-screen absolute top-0 left-1/2"
    />
  ) : (
    children
  );
};

export default LoadingWrapper;
