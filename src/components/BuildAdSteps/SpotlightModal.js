import React, { useState } from "react";
import Modal from "../Modal";
import { Form, Formik } from "formik";
import Step1 from "./SpotlightModalSteps/Step1";
import Step2 from "./SpotlightModalSteps/Step2";

const SpotlightModal = ({ onClick }) => {
  const [step, setStep] = useState(1);

  return (
    <Modal className="w-9/12">
      <Step1 />
      <div className="text-right pr-8 py-8">
        <button
          type="button"
          onClick={onClick}
          className="bg-[#8891B2] text-white py-3 px-7 mr-5 rounded-md min-w-[120px]"
        >
          Close
        </button>
        <button
          type="button"
          className="bg-[#0D1A8B] text-white py-3 px-7  rounded-md min-w-[120px]"
        >
          Next
        </button>
      </div>
    </Modal>
  );
};

export default SpotlightModal;
