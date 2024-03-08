import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingWrapper = ({ loading, children, className }) => {
  return loading ? (
    <Oval
      secondaryColor="#8891B2"
      color="#0D1A8B"
      wrapperClass={`justify-center items-center min-h-screen absolute left-1/2 ${className}`}
    />
  ) : (
    children
  );
};

export default LoadingWrapper;
