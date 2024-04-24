import React, { useEffect, useRef } from "react";

const Heading = ({ content, fontSize, className }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <h2
      ref={headingRef}
      className={`text-[#0D1A8B] font-semibold build-step-heading ${
        fontSize ? "text-base" : "text-xl"
      } flex items-center gap-2 ${className}`}
    >
      <div className="bg-[#0D1A8B] w-[5px] h-8 rounded-xl"></div>
      {content}
    </h2>
  );
};

export default Heading;
