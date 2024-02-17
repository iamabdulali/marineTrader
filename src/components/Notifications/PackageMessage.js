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
        <img src={image} className="sm:w-10 w-7 inline-block" />
        <p className="inline-block mr-1 sm:text-base text-sm">
          {content}{" "}
          {hasLink ? (
            <Link to={LinkPath} className={linkClass}>
              {LinkText}
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
      <p className="min-w-7 min-h-7 cursor-pointer bg-[#ff0000] flex items-center justify-center rounded-full">
        {icon}
      </p>
    </div>
  );
};

export default PackageMessage;
