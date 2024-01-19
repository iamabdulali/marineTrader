import React from "react";

const PackageMessage = ({ image, content, icon, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <img src={image} className="w-10" />
        <p>{content}</p>
      </div>
      <p className="w-7 h-7 bg-[#ff0000] flex items-center justify-center rounded-full">
        {icon}
      </p>
    </div>
  );
};

export default PackageMessage;
