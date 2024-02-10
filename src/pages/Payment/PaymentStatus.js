import React from "react";
import { error, success } from "../../assets";
import Layout from "../../components/Layout/Layout";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentStatus = ({ successStatus }) => {
  return (
    <Layout>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full mx-auto">
        <div className="bg-white w-1/3 min-h-[40vh] flex flex-col justify-center text-center shadow-[7px] rounded-md mx-auto">
          <img
            className="w-48 mx-auto"
            src={successStatus ? success : error}
            alt="success"
          />
          <p
            className={`${
              successStatus ? "text-[#1CBF73]" : "text-[#FF4A6B]"
            } text-lg my-3 font-semibold`}
          >
            {successStatus ? "Congratulations" : "Payment Failed"}
          </p>
          <p
            className={`text-[#8891B2] ${
              successStatus ? "w-2/5" : "w-1/2"
            }  text-center mx-auto`}
          >
            {successStatus
              ? "You have successfully listed your item."
              : "The card details you have entered are incorrect, please try again. "}
          </p>
        </div>
        <Link
          to={successStatus ? "/dashboard" : "/payments"}
          className="text-[#0D1A8B] font-semibold underline flex items-center gap-4 justify-center mt-5"
        >
          {successStatus ? (
            <>
              {" "}
              <FaArrowLeft /> Back To Dashboard
            </>
          ) : (
            "Try Again"
          )}
        </Link>
      </div>
    </Layout>
  );
};

export default PaymentStatus;
