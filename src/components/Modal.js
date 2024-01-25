import React from "react";

const Modal = ({ children, className }) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black z-10 bg-opacity-70 ">
      <div
        className={`max-h-screen overflow-y-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${className} bg-white z-20 rounded-tr-lg rounded-tl-lg rounded-br-lg rounded-bl-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
