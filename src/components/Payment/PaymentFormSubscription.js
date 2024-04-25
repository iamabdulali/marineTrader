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
import { SERVER_BASE_URL, categoriesList } from "../..";
import { toast } from "react-toastify";
import PaymentStatus from "../../pages/Payment/PaymentStatus";
import StripePaymentForm from "./StripePaymentForm";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { useNavigate } from "react-router-dom";
import { displayErrorMessages } from "../../utils/displayErrors";
import {
  checkCategorySubscription,
  fetchOptions,
} from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";

const PaymentFormSubscription = () => {
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  const [hasBundle, setHasBundle] = useState(0);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [subscription, setSubscriptions] = useState([]);
  const [subscriptionsPlans, setSubscriptionsPlans] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [hasActiveSubscriptionData, setHasActiveSubscriptionData] = useState(
    []
  );
  const [categorySubscription, setCategorySubscription] = useState(0);

  const [selectedBundle, setSelectedBundle] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const pathArray = window.location.pathname.split("/");
  const isSubscriptionPage = pathArray[2];
  const id = pathArray[3];

  const { selectedCategory, user } = useContext(AuthContext);

  const { seller_type, currency_id } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const categoryToCheck = categoriesList.indexOf(selectedCategory?.name);

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/subscriptions");
    }
    fetchOptions("subscriptions", setSubscriptions);
    fetchOptions(
      `subscription/advert/remains/${categoryToCheck}`,
      setCategorySubscription,
      setLoading
    );
  }, []);

  console.log({ selectedCategory });

  useEffect(() => {
    fetchOptions(
      `subscription-plans?category=${selectedCategory?.id || categoryToCheck}`,
      setSubscriptionsPlans,
      setLoading
    );
    console.log(subscriptionsPlans);
  }, [selectedCategory]);

  const index = categoriesList.indexOf(selectedCategory?.name);
  console.log(index);

  useEffect(() => {
    checkCategorySubscription(
      subscription,
      categoryToCheck,
      setHasActiveSubscription,
      setHasActiveSubscriptionData
    );
  }, [subscription]);

  console.log(hasActiveSubscriptionData);

  useEffect(() => {
    fetchOptions(`bundles?type=premium`, setBundles, setLoading);
  }, []);

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

  const generateStripeToken = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(cardNumberElement);

    if (!token || error) {
      throw error;
    }

    return token;
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
      if (selectedBundle !== undefined && selectedBundle !== null) {
        const bundleToken = await generateStripeToken();
        const { data } = await axios.post(
          `${SERVER_BASE_URL}/bundle-payment/${selectedBundle}`,
          {
            currency: currency_id,
            stripe_token: bundleToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success(data.message);
      }
      navigate("/subscriptions");
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
      const { errors } = error?.response?.data;
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
          subscription: hasActiveSubscriptionData?.id,
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
      if (selectedBundle !== undefined && selectedBundle !== null) {
        const bundleToken = await generateStripeToken();
        const { data } = await axios.post(
          `${SERVER_BASE_URL}/bundle-payment/${selectedBundle}`,
          {
            currency: currency_id,
            stripe_token: bundleToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success(data.message);
      }
      navigate("/subscriptions");
    } catch (error) {
      console.log(error);
      setSpinner(false);
      const { errors } = error?.response?.data;
      displayErrorMessages(errors);
    }
  };

  console.log({ isSubscriptionPage, id });

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
                  <PaymentSummary
                    subscription={subscriptionsPlans}
                    id={id}
                    isSubscriptionPage={isSubscriptionPage}
                    isBundleSelected={selectedBundle}
                    bundles={bundles}
                    existingSubscriptionData={hasActiveSubscriptionData}
                  />
                  {!isPrivateSeller &&
                  hasActiveSubscriptionData == undefined ? (
                    <AvailableUpgrades
                      className="bg-[#1CBF73] flex flex-col gap-5 mt-8 p-5 rounded-lg w-full"
                      showSpotlight={false}
                      addButton={true}
                      openBundle={() => openModal(setIsBundleOpen)}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <StripePaymentForm
                  hasSubscription={categorySubscription}
                  handlePaymentSubmit={
                    hasActiveSubscription
                      ? updateSubscription
                      : handlePaymentSubmit
                  }
                  spinner={spinner}
                  hasBundle={hasBundle}
                />
              </div>
            </Layout>
            <Modal
              isOpen={isBundleOpen}
              onClose={() => closeModal(setIsBundleOpen)}
              opacity="bg-opacity-40"
              width="xl:w-6/12 w-full"
            >
              <BundlesModal
                setSelectedBundle={setSelectedBundle}
                onClick={() => closeModal(setIsBundleOpen)}
                bundleType={"premium"}
              />
            </Modal>
          </LoadingWrapper>
        </>
      )}
    </>
  );
};

export default PaymentFormSubscription;
