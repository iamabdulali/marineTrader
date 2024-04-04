import React from "react";
import Heading from "../Heading";

const BuildLayout = ({ heading, children, otherContent }) => {
  return (
    <>
      <div className="mt-10 bg-white py-7 rounded-lg">
        <div className="sm:flex items-center justify-between block">
          <Heading content={heading} fontSize={true} />
          <p className="sm:pr-7 text-right sm:mt-0 mt-2 block pr-4 font-medium text-sm">
            {otherContent}
          </p>
        </div>
        <div className="mt-5 sm:px-7 px-4">{children}</div>
      </div>
    </>
  );
};

export default BuildLayout;
