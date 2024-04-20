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
import {
  fetchOptions,
  getOneAdvert,
  getPackages,
} from "../../utils/fetch/fetchData";
import axios from "axios";
import { SERVER_BASE_URL, advertPackages } from "../..";
import { toast } from "react-toastify";
import PaymentStatus from "../../pages/Payment/PaymentStatus";
import StripePaymentForm from "./StripePaymentForm";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";

const PaymentFormAd = ({ setFieldValue, values }) => {
  const [selectedBundle, setSelectedBundle] = useState(null);
  let [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  const [hasBundle, setHasBundle] = useState(0);
  const [categorySubscription, setCategorySubscription] = useState(0);
  const [subscritpions, setSubscriptions] = useState([]);
  const [advert, setAdvert] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useContext(AuthContext);

  const { currency_id: user_currency_id, seller_type } = Object(user);
  const isPrivateSeller = seller_type == "private seller";

  const pathArray = window.location.pathname.split("/");
  const id = pathArray[3];

  const isAdvertUpgrade = pathArray.includes("advert-upgrade");

  const {
    currency_id,
    advert_package_id,
    advert_status,
    category_id,
    category_spotlights_countries,
    category_spotlights_continents,
    home_spotlights_countries,
    home_spotlights_continents,
    spotlight_status,
  } = Object(advert);

  let packageType;

  useEffect(() => {
    getOneAdvert(setAdvert, id, "advert", setLoading);
    getPackages(setPackages, seller_type, setLoading);
  }, [user]);

  if (advertPackages[advert_package_id] == "Standard") {
    packageType = "Premium";
  } else {
    packageType = advertPackages[advert_package_id];
  }

  console.log(advertPackages[advert_package_id]);

  useEffect(() => {
    fetchOptions(`bundles?type=${packageType}`, setBundles, setLoading);
  }, [advert]);

  useEffect(() => {
    fetchOptions(
      `bundle/advert/remains?type=${advertPackages[advert_package_id]}`,
      setHasBundle,
      setLoading
    );
    fetchOptions(
      `subscription/advert/remains/${category_id}`,
      setCategorySubscription,
      setLoading
    );
    fetchOptions("subscriptions", setSubscriptions, setLoading);
  }, [id, advert_package_id]);

  const hasBrokerOrDealerSubscription = () => {
    return subscritpions.some((subscription) => {
      return (
        subscription.subscription_plan.name === "Broker plus" ||
        subscription.subscription_plan.name === "Dealer plus"
      );
    });
  };

  let spotlights = 0;

  if (
    (category_spotlights_countries?.length === 0 &&
      category_spotlights_continents?.length === 0 &&
      home_spotlights_countries?.length === 0 &&
      home_spotlights_continents?.length === 0) ||
    spotlight_status == "paid"
  ) {
    spotlights = false;
  } else {
    spotlights =
      category_spotlights_countries?.length * 6.99 +
      category_spotlights_continents?.length * 89.99 +
      home_spotlights_countries?.length * 6.99 +
      home_spotlights_continents?.length * 89.99;
  }

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

  const handleCombinedPayments = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const adToken = await generateStripeToken();
      let adPaymentResponse, bundlePaymentResponse;

      // Ad Payment
      if (!isAdvertUpgrade) {
        adPaymentResponse = await axios.post(
          `${SERVER_BASE_URL}/advert-payment/${id}`,
          {
            advert_package: advert_package_id,
            currency: currency_id,
            stripe_token: adToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        adPaymentResponse = await axios.post(
          `${SERVER_BASE_URL}/advert-upgrade/${id}`,
          {
            advert_package: Number(advert_package_id) + 1,
            currency: currency_id,
            stripe_token: adToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      toast.success(adPaymentResponse.data.message);

      // Bundle Payment (if selectedBundle is defined)
      if (selectedBundle !== undefined && selectedBundle !== null) {
        const bundleToken = await generateStripeToken();
        bundlePaymentResponse = await axios.post(
          `${SERVER_BASE_URL}/bundle-payment/${selectedBundle}`,
          {
            advert_package: advert_package_id,
            currency: user_currency_id,
            stripe_token: bundleToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success(bundlePaymentResponse.data.message);
      }

      setSpinner(false);
      setSuccess(true);
      setShowStatus(true);
    } catch (error) {
      console.error(error);
      setSpinner(false);
      setSuccess(false);
      setShowStatus(true);
      toast.error(error.response.data.message);
    }
  };

  // if (advert_status == "paid") {
  //   navigate("/dashboard");
  // }

  return (
    <>
      {showStatus ? (
        <PaymentStatus successStatus={success} paymentType="list" />
      ) : (
        <>
          <LoadingWrapper
            loading={loading}
            className="top-0 xl:-translate-x-0 -translate-x-1/2"
          >
            <Layout>
              <Heading content="Payment Details" />
              <div className="flex smallLg:flex-row flex-col gap-7">
                <div className="smallLg:w-1/2 w-full">
                  <PaymentSummary
                    advert={advert}
                    packages={packages}
                    isBundleSelected={selectedBundle}
                    bundles={bundles}
                    spotlights={spotlights}
                    hasBundle={hasBundle}
                    hasSubscription={categorySubscription}
                    isAdvertUpgrade={isAdvertUpgrade}
                    categoryCountrySpotlights={category_spotlights_countries}
                    categoryContinentSpotlights={category_spotlights_continents}
                    homeCountrySpotlights={home_spotlights_countries}
                    homeContinentSpotlights={home_spotlights_continents}
                  />
                  {!isPrivateSeller &&
                  hasBrokerOrDealerSubscription() &&
                  advertPackages[advert_package_id] != "Standard" ? (
                    <AvailableUpgrades
                      className="bg-[#1CBF73] flex flex-col gap-5 mt-8 p-5 rounded-lg w-full"
                      openModal={() => openModal(setIsSpotlightOpen)}
                      addButton={true}
                      openBundle={() => openModal(setIsBundleOpen)}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <StripePaymentForm
                  hasBundle={hasBundle}
                  hasSubscription={categorySubscription}
                  id={category_id}
                  handlePaymentSubmit={
                    // isBundlePayment ? handleBundlePayment : handleAdPayment
                    handleCombinedPayments
                  }
                  spinner={spinner}
                  bundleType={advertPackages[advert_package_id]}
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
              <BundlesModal
                setSelectedBundle={setSelectedBundle}
                onClick={() => closeModal(setIsBundleOpen)}
                bundleType={advertPackages[advert_package_id]}
              />
            </Modal>
          </LoadingWrapper>
        </>
      )}
    </>
  );
};

export default PaymentFormAd;
