import React from "react";
import { speakerIcon } from "../../assets";
import { FaTimesCircle } from "react-icons/fa";

const alert = () => {
  return (
    <div>
      <div>
        <img src={speakerIcon} />
        <p>
          We have just launched our Premium Pro Package! Go and explore it’s
          benefits. <Link> Check Now!</Link>
        </p>
      </div>
      <FaTimesCircle />
    </div>
  );
};

export default alert;
