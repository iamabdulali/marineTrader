import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../../components/Payment/PaymentForm";
import { Form, Formik } from "formik";

const Payment = () => {
  const stripe = loadStripe(
    "pk_test_51OTmDuDrmRTy0GxZLR4C2hn3O5wWlWvAk1WbX7flR8BSWH3d83dMOPi9RN8h6ueK9xWqkoWopMkvxS0OVhz2vzwn00wuaqAOGd"
  );
  return (
    <Elements stripe={stripe}>
      <Formik>
        <PaymentForm></PaymentForm>
      </Formik>
    </Elements>
  );
};

export default Payment;
