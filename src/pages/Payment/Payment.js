import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../../components/Payment/PaymentForm";
import { Form, Formik } from "formik";

const Payment = () => {
  const stripe = loadStripe(
    "pk_test_51NMtq1B668ud5SeijFm72obtlqRPZAO73yZY1uwOVKUluZfygSXUe3KD4US7sc55OSLeTR47WbQui3momJjeIWou00UhkEM2Mx"
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
