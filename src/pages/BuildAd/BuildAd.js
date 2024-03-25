import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProgressSteps from "../../components/ProgressSteps";
import { Formik, Form } from "formik";
import ItemDescriptionStep2 from "../../components/BuildAdSteps/ItemDescriptionStep2";
import ItemFeaturesStep3 from "../../components/BuildAdSteps/ItemFeaturesStep3";
import NotesSteps4 from "../../components/BuildAdSteps/NotesSteps4";
import PriceStep6 from "../../components/BuildAdSteps/PriceStep6";
import GalleryStep5 from "../../components/BuildAdSteps/GalleryStep5";
import { buildAdValidationSchema } from "../../utils/ValidationSchema";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import PaymentOptionModal from "../../components/BuildAdSteps/AdComponents/PaymentOptionModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import VideoModal from "../../components/VideoTutorial/VideoModal";
import VideoBtn from "../../components/VideoTutorial/VideoBtn";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { getOneAdvert } from "../../utils/fetch/fetchData";

const BuildAd = () => {
  const [step, setStep] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const NavigateTo = useNavigate();

  const [advert, setAdvert] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathArray = window.location.pathname.split("/");
  const id = pathArray[4];

  const IsEditMode = () => {
    const location = useLocation();
    return location.pathname.startsWith("/selling/buildAd/advert");
  };

  const EditMode = IsEditMode();

  useEffect(() => {
    if (EditMode) {
      getOneAdvert(setAdvert, setLoading, id);
    }
  }, []);

  const stepLabels = ["Description", "Features", "Notes", "Gallery", "Price"];

  const { selectedPackage, selectedCategory } = useContext(AuthContext);

  const initialValuesJetSki = {
    category: selectedCategory?.id,
    title: "",
    sub_title: "",
    type: "",
    make: "",
    model: "",
    year: "",
    condition: "",
    color: "",
    service_history: "",
    passenger: "",
    length: "",
    hours: "",
    trailers: "",
    modifications: [],
    features: [],
    conveniences: [],
    accessories: [],
    description: "",
    tags: [],
    images: [],
    video: null,
    priceOnInformation: "",
    currency: "",
    price: "",
    facilities: [],
    advert_package: selectedPackage,
    category_spotlights_countries: [],
    category_spotlights_continents: [],
    home_spotlights_countries: [],
    home_spotlights_continents: [],
    stripe_token: "",
    // engineCount: 0,
    // selectedEngine: -1,
    // engines: [],
  };
  const initialValuesBoatHome = {
    category: selectedCategory?.id,
    title: "",
    sub_title: "",
    type: "",
    make: "",
    model: "",
    year: "",
    condition: "",
    length: "",
    width: "",
    height: "",
    depth: "",
    hull_material: "",
    hull_shape: "",
    keel_type: "",
    modifications: [],
    features: [],
    conveniences: [],
    accessories: [],
    description: "",
    tags: [],
    images: [],
    video: null,
    priceOnInformation: "",
    currency: "",
    price: "",
    facilities: [],
    advert_package: selectedPackage,
    category_spotlights_countries: [],
    category_spotlights_continents: [],
    home_spotlights_countries: [],
    home_spotlights_continents: [],
    advert_status: "",
    stripe_token: "",
    engineCount: 0,
    selectedEngine: -1,
    engines: [],
    bow_make: "",
    bow_power: "",
    bow_modal: "",
    bow_year: "",
    stern_make: "",
    stern_power: "",
    stern_modal: "",
    stern_year: "",
    generator_make: "",
    generator_power: "",
    generator_modal: "",
    generator_year: "",
    generator_consumption: "",
    generator_hours: "",
  };
  const editValues = {
    advert,
  };

  const bigBoatValidationArrayStep1 = [
    "title",
    "sub_title",
    "make",
    "model",
    "year",
    "condition",
    "type",
    "hull_shape",
    "hull_material",
    "keel_type",
    "width",
    "height",
    "depth",
    "length",
  ];
  const smallBoatsValidationArrayStep1 = [
    "title",
    "sub_title",
    "make",
    "model",
    "year",
    "condition",
    "color",
    "service_history",
    "passenger",
    "length",
    "hours",
    "trailers",
  ];

  const bigBoatValidationArrayStep2 = [
    "engines",
    "bow_make",
    "bow_modal",
    "bow_year",
    "bow_power",
    "stern_make",
    "stern_modal",
    "stern_year",
    "stern_power",
    "generator_make",
    "generator_modal",
    "generator_year",
    "generator_power",
    "generator_consumption",
    "generator_hours",
  ];
  const smallBoatsValidationArrayStep2 = [
    "modification",
    "feature",
    "convenience",
    "accessories",
  ];

  const prevStep = () => setStep(step - 1);
  // const nextStep = () => setStep(step + 1);
  const [isPaymentOptionOpen, setIsPaymentOptionOpen] = useState(false);
  let [isVideoOpen, setIsVideoOpen] = useState(false);

  const nextStep = (values, { setTouched, setErrors }) => {
    try {
      const fieldsToValidate = Object.keys(
        buildAdValidationSchema.fields
      ).filter((field) => {
        if (step === 1) {
          return selectedCategory?.name == "Boat Home"
            ? bigBoatValidationArrayStep1.includes(field)
            : smallBoatsValidationArrayStep1.includes(field);
        } else if (step === 2) {
          return selectedCategory?.name == "Boat Home"
            ? bigBoatValidationArrayStep2.includes(field)
            : smallBoatsValidationArrayStep2.includes(field);
        } else if (step === 3) {
          return ["description", "tags"].includes(field);
        } else if (step === 4) {
          return ["images"].includes(field);
        } else if (step === 5) {
          return ["currency", "price"].includes(field);
        }
        return true; // Include all fields if not in a specific step
      });

      buildAdValidationSchema.pick(fieldsToValidate).validateSync(values, {
        abortEarly: false,
      });

      // Increment the step
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation errors:", error.errors);

        const allFields = Object.keys(values);
        const touchedState = allFields.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
        setTouched(touchedState);

        const errorState = error.errors.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorState);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setSpinner(true);
    try {
      const { data } = await axios.post(`${SERVER_BASE_URL}/advert`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(data.message);
      openModal(setIsPaymentOptionOpen);
      setSpinner(false);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (selectedCategory == null && !EditMode) {
      NavigateTo("/selling");
    }
  }, []);

  return (
    <Layout>
      <p className="rounded-lg shadow-[7px] bg-white font-semibold py-5 px-7">
        Build Your Ad
      </p>
      <ProgressSteps
        className="mt-7"
        totalSteps={stepLabels.length}
        currentStep={step}
        stepLabels={stepLabels}
      />
      <Formik
        initialValues={
          selectedCategory?.name == "Boat Home"
            ? initialValuesBoatHome
            : initialValuesJetSki
        }
        validationSchema={buildAdValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, values, setErrors, setTouched, setFieldValue }) => (
          <Form>
            {step === 1 && <ItemDescriptionStep2 />}
            {step === 2 && <ItemFeaturesStep3 />}
            {step === 3 && <NotesSteps4 />}
            {step === 4 && <GalleryStep5 />}
            {step === 5 && (
              <PriceStep6 values={values} setFieldValue={setFieldValue} />
            )}
            {/* Navigation buttons */}
            <div className="flex sm:flex-row flex-col-reverse align-center justify-between mt-10 mb-24">
              <div className="sm:w-auto w-full flex gap-5 items-center sm:flex-row flex-col sm:mt-0 mt-5">
                <Link
                  to={"/selling"}
                  type="button"
                  className="bg-white text-center sm:order-none order-1 hover:bg-[#8891B2] hover:text-white border-2 sm:w-28 w-full border-[#8891B2] text-[#8891B2] p-3 rounded-md  text-sm font-medium "
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  className="bg-white border-2 sm:w-auto w-full hover:bg-[#0D1A8B] hover:text-white border-[#0D1A8B] text-[#0D1A8B] font-medium p-3 rounded-md text-sm"
                >
                  Save To Draft
                </button>
              </div>
              <div className="text-right flex items-center gap-5">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#8891B2] hover:bg-[#a3aac4] sm:w-28 w-full  text-white p-3 rounded-md "
                  >
                    Back
                  </button>
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => nextStep(values, { setTouched, setErrors })}
                    className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 rounded-md sm:w-28 w-full`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    to="/"
                    type={submit ? "submit" : "button"}
                    onClick={() => {
                      setSubmit(true);
                    }}
                    disabled={spinner}
                    className={`bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white p-3 rounded-md inline-block text-center sm:w-28 w-full  ${
                      isValid ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {spinner ? (
                      <Oval
                        secondaryColor="#fff"
                        color="#fff"
                        width={20}
                        height={20}
                        wrapperClass="justify-center"
                      />
                    ) : (
                      "List Item"
                    )}
                  </button>
                )}
              </div>
            </div>
            <Modal
              isOpen={isPaymentOptionOpen}
              onClose={() => closeModal(setIsPaymentOptionOpen)}
              opacity="bg-opacity-40"
              width="lg:w-1/3"
            >
              <PaymentOptionModal
                onClose={() => closeModal(setIsPaymentOptionOpen)}
              />
            </Modal>
          </Form>
        )}
      </Formik>
      <VideoBtn onClick={() => openModal(setIsVideoOpen)} />
      <Modal
        isOpen={isVideoOpen}
        onClose={() => closeModal(setIsVideoOpen)}
        opacity="bg-opacity-40"
        width="xl:w-6/12 sm:w-10/12 w-full"
      >
        <VideoModal />
      </Modal>
    </Layout>
  );
};

export default BuildAd;
