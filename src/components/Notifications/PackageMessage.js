import React from "react";
import { Link } from "react-router-dom";

const PackageMessage = ({
  image,
  content,
  icon,
  className,
  hasLink,
  LinkText,
  LinkPath,
  linkClass,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <img src={image} className="w-10" />
        <p>{content}</p>
        {hasLink ? (
          <Link to={LinkPath} className={linkClass}>
            {LinkText}
          </Link>
        ) : (
          ""
        )}
      </div>
      <p className="w-7 h-7 cursor-pointer bg-[#ff0000] flex items-center justify-center rounded-full">
        {icon}
      </p>
    </div>
  );
};

export default PackageMessage;
