import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import { fetchOptions } from "../../utils/fetch/fetchData";
import PaymentFormSubscription from "../../components/Payment/PaymentFormSubscription";
import PaymentFormAd from "../../components/Payment/PaymentFormAd";

const Payment = () => {
  const [stripeKey, setStripeKey] = useState("");
  const location = useLocation(); // Get the current location
  const isAdPayment = location.pathname.startsWith("/payment/advert");

  useEffect(() => {
    fetchOptions("stripe/key", setStripeKey);
  }, []);

  // Load Stripe only when stripeKey is available
  const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Formik>
            <Form>
              {isAdPayment ? <PaymentFormAd /> : <PaymentFormSubscription />}
            </Form>
          </Formik>
        </Elements>
      )}
    </>
  );
};

export default Payment;
