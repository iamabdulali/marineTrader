import React, { useEffect, useState } from "react";
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
import { getOneAdvert } from "../../utils/fetch/fetchData";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import PaymentStatus from "../../pages/Payment/PaymentStatus";
import StripePaymentForm from "./StripePaymentForm";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ setFieldValue, values }) => {
  let [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  let [isBundleOpen, setIsBundleOpen] = useState(false);
  const [advert, setAdvert] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const pathArray = window.location.pathname.split("/");
  const id = pathArray[2];

  useEffect(() => {
    getOneAdvert(setAdvert, setLoading, id);
  }, []);

  const { currency_id, advert_package_id, advert_status } = Object(advert);

  console.log(advert);

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
      const token = await generateStripeToken();
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/advert-payment/${id}`,
        {
          advert_package: advert_package_id,
          currency: currency_id,
          stripe_token: token.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      setSpinner(false);
      setSuccess(true);
      setShowStatus(true);
    } catch (error) {
      console.log(error);
      setSpinner(false);
      setSuccess(false);
      setShowStatus(true);
      toast.error(error.response.data.message);
    }
  };

  if (advert_status == "paid") {
    navigate("/dashboard");
  }

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
                  handlePaymentSubmit={handlePaymentSubmit}
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

export default PaymentForm;
