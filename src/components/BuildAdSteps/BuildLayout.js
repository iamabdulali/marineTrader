import React from "react";
import Heading from "../Heading";

const BuildLayout = ({ heading, children }) => {
  return (
    <>
      <div className="mt-10 bg-white py-7 rounded-lg">
        <Heading content={heading} fontSize={true} />
        <div className="mt-5 px-7">{children}</div>
      </div>
    </>
  );
};

export default BuildLayout;
