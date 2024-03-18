import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Heading from "../Heading";
import PaymentSummary from "./PaymentSummary";
import SpotlightModal from "../BuildAdSteps/SpotlightModal";
import Modal from "../Modal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import AvailableUpgrades from "../BuildAdSteps/AdComponents/AvailableUpgrades";
import BundlesModal from "../BuildAdSteps/AdComponents/BundlesModal";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import PaymentStatus from "../../pages/Payment/PaymentStatus";
import StripePaymentForm from "./StripePaymentForm";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { useNavigate } from "react-router-dom";
import { displayErrorMessages } from "../../utils/displayErrors";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";

const PaymentFormSubscription = ({ setFieldValue, values }) => {
  let [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  const [advert, setAdvert] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [subscription, setSubscriptions] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [hasActiveSubscriptionId, setHasActiveSubscriptionId] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const pathArray = window.location.pathname.split("/");
  const id = pathArray[3];

  const { selectedCategory } = useContext(AuthContext);

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/subscriptions");
    }
    fetchOptions("subscriptions", setSubscriptions, setLoading);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userSubscriptions = subscription;
      // Check if the user has an active subscription in the specified category
      const foundSubscription = userSubscriptions.find((subscription) => {
        return subscription.subscription_plan.category_id == categoryToCheck;
      });
      setHasActiveSubscriptionId(foundSubscription?.id);
      setHasActiveSubscription(foundSubscription !== undefined);
    };

    fetchData();
  }, [subscription]);

  const generatePaymentMethod = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    return paymentMethod;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const { paymentMethod } = await generatePaymentMethod();

      const { data } = await axios.post(
        `${SERVER_BASE_URL}/subscribe`,
        {
          subscription_plan: id,
          payment_method: paymentMethod.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
      navigate("/subscriptions");
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
    }
  };

  const updateSubscription = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/subscription/upgrade`,
        {
          subscription: hasActiveSubscriptionId,
          new_plan: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data.data);
      toast.success(data.message);
      setSpinner(false);
      navigate("/subscriptions");
    } catch (error) {
      console.log(error);
      setSpinner(false);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
    }
  };

  return (
    <>
      {showStatus ? (
        <PaymentStatus successStatus={success} paymentType="list" />
      ) : (
        <>
          <LoadingWrapper loading={loading}>
            <Layout>
              <Heading content="Payment Details" />
              <div className="flex smallLg:flex-row flex-col gap-7">
                <div className="smallLg:w-1/2 w-full">
                  <PaymentSummary advert={advert} />
                  <AvailableUpgrades
                    className="bg-[#1CBF73] flex flex-col gap-5 mt-8 p-5 rounded-lg w-full"
                    openModal={() => openModal(setIsSpotlightOpen)}
                    addButton={true}
                    openBundle={() => openModal(setIsBundleOpen)}
                  />
                </div>
                <StripePaymentForm
                  handlePaymentSubmit={
                    hasActiveSubscription
                      ? updateSubscription
                      : handlePaymentSubmit
                  }
                  spinner={spinner}
                />
              </div>
            </Layout>
            <Modal
              isOpen={isSpotlightOpen}
              onClose={() => closeModal(setIsSpotlightOpen)}
              opacity="bg-opacity-40"
              width="xl:w-9/12 w-full"
            >
              <SpotlightModal
                value={values}
                setFieldValue={setFieldValue}
                onClick={() => closeModal(setIsSpotlightOpen)}
              />
            </Modal>
            <Modal
              isOpen={isBundleOpen}
              onClose={() => closeModal(setIsBundleOpen)}
              opacity="bg-opacity-40"
              width="xl:w-6/12 w-full"
            >
              <BundlesModal onClick={() => closeModal(setIsBundleOpen)} />
            </Modal>
          </LoadingWrapper>
        </>
      )}
    </>
  );
};

export default PaymentFormSubscription;
