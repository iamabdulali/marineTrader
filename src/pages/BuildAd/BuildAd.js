import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProgressSteps from "../../components/ProgressSteps";
import { Formik, Form } from "formik";
import ItemDescriptionStep2 from "../../components/BuildAdSteps/ItemDescriptionStep2";
import ItemFeaturesStep3 from "../../components/BuildAdSteps/ItemFeaturesStep3";
import NotesSteps4 from "../../components/BuildAdSteps/NotesSteps4";
import PriceStep6 from "../../components/BuildAdSteps/PriceStep6";
import GalleryStep5 from "../../components/BuildAdSteps/GalleryStep5";
import {
  buildAdBigBoatsValidationSchema,
  buildAdSmallBoatsValidationSchema,
  emptySchema,
} from "../../utils/ValidationSchema";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import PaymentOptionModal from "../../components/BuildAdSteps/AdComponents/PaymentOptionModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import { SERVER_BASE_URL, bigBoats, smallBoats } from "../..";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { fetchOptions, getOneAdvert } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";

const BuildAd = () => {
  const [step, setStep] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const NavigateTo = useNavigate();
  const [advertID, setAdvertID] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(0);
  const [hasBundle, setHasBundle] = useState(0);
  const [advert, setAdvert] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSpotlight, setHasSpotlights] = useState(false);
  const { selectedPackage, selectedCategory, dispatch } =
    useContext(AuthContext);

  const pathArray = window.location.pathname.split("/");
  const id = pathArray[4];

  const IsEditMode = () => {
    const location = useLocation();
    return location.pathname.startsWith("/selling/buildAd/advert");
  };

  const EditMode = IsEditMode();

  useEffect(() => {
    if (EditMode) {
      getOneAdvert(setAdvert, id, "advert", setLoading);
    }
  }, []);

  useEffect(() => {
    if (advertID) {
      getOneAdvert(setAdvert, advertID, "advert", setLoading);
    }
  }, [advertID]);

  const stepLabels = ["Description", "Features", "Notes", "Gallery", "Price"];

  let validationSchema;

  if (smallBoats.includes(selectedCategory?.name)) {
    validationSchema = buildAdSmallBoatsValidationSchema;
  } else {
    validationSchema = buildAdBigBoatsValidationSchema;
  }

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
    price_type: "enterInfo",
    currency: "",
    price: "",
    paymentMethod: "checkout",
    facilities: [],
    advert_package: selectedPackage,
    category_spotlights_countries: [],
    category_spotlights_continents: [],
    home_spotlights_countries: [],
    home_spotlights_continents: [],
    finance_available: "no",
    warranty: "no",
    water_test_facility: "no",
    part_exchange_available: "no",
    stripe_token: "",
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
    hull_material: "",
    hull_shape: "",
    keel_type: "",
    capacity: "",
    vessel_name: "",
    hin_number: "",
    registration: "",
    vessel_type: "",
    port: "",
    registry_number: "",
    boat_status: "",
    length: "",
    width: "",
    height: "",
    depth: "",
    displacement: "",
    dead_rise: "",
    dry_weight: "",
    cruising_speed: "",
    maximum_speed: "",
    economy: "",
    water_tanks: "",
    water_tanks_capacity: "",
    fuel_tanks: "",
    fuel_tanks_capacity: "",
    holding_tanks: "",
    holding_tanks_capacity: "",
    powers: [],
    description: "",
    tags: [],
    images: [],
    video: null,
    price_type: "enterInfo",
    currency: "",
    price: "",
    paymentMethod: "checkout",
    facilities: [],
    advert_package: selectedPackage,
    category_spotlights_countries: [],
    category_spotlights_continents: [],
    home_spotlights_countries: [],
    home_spotlights_continents: [],
    advert_status: "",
    stripe_token: "",
    engine_count: 0,
    selected_engine: -1,
    engines: [],
    bow: {},
    stern: {},
    generator: {},
    finance_available: "no",
    warranty: "no",
    water_test_facility: "no",
    part_exchange_available: "no",
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
    // "sub_title",
    "make",
    "model",
    "year",
    "condition",
    "color",
    "service_history",
    "length",
    "hours",
    "trailers",
  ];

  const bigBoatValidationArrayStep2 = ["engines", "bow", "stern", "generator"];
  const smallBoatsValidationArrayStep2 = [
    "modification",
    "feature",
    "convenience",
    "accessories",
  ];

  const prevStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);
  const [isPaymentOptionOpen, setIsPaymentOptionOpen] = useState(false);
  let [isVideoOpen, setIsVideoOpen] = useState(false);

  const nextStepValidation = (values, { setTouched, setErrors }) => {
    try {
      const fieldsToValidate = Object.keys(validationSchema.fields).filter(
        (field) => {
          if (step === 1) {
            return bigBoats.includes(selectedCategory?.name)
              ? bigBoatValidationArrayStep1.includes(field)
              : smallBoatsValidationArrayStep1.includes(field);
          } else if (step === 2) {
            return bigBoats.includes(selectedCategory?.name)
              ? bigBoatValidationArrayStep2.includes(field)
              : smallBoatsValidationArrayStep2.includes(field);
          } else if (step === 3) {
            return ["description", "tags"].includes(field);
          } else if (step === 4) {
            return ["images"].includes(field);
          } else if (step === 5) {
            return ["currency", "price", "price_type"].includes(field);
          }
          return true; // Include all fields if not in a specific step
        }
      );

      validationSchema.pick(fieldsToValidate).validateSync(values, {
        abortEarly: false,
      });

      // Increment the step
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation errors:", error.errors);
        toast.error("Please Fill All the Required Fields");
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

  useEffect(() => {
    fetchOptions("bundle/advert/remains", setHasBundle);
    fetchOptions(
      `subscription/advert/remains/${selectedCategory?.id}`,
      setHasSubscription
    );
  }, [id]);

  const handleSubmit = async (values, { setFieldValue }) => {
    setSpinner(true);

    if (EditMode) {
      const { advert } = Object(values);
      const {
        category,
        condition,
        type,
        currency,
        make,
        model,
        tags,
        accessories,
        conveniences,
        features,
        modifications,
        powers,
      } = Object(advert);
      const tagNames = tags.map((tag) => tag.name);
      const accessoriesArray = accessories.map((accessory) => accessory.name);
      const modificationsArray = modifications.map(
        (modification) => modification.name
      );
      const featuresArray = features.map((feature) => feature.name);
      const conveniencesArray = conveniences.map(
        (convenience) => convenience.name
      );
      const powersArray = powers.map((power) => power.name);

      const updatedValues = {
        ...advert,
        _method: "put",
        make: make?.name || make,
        model: model?.name || model,
        category: category?.id || category,
        condition: condition?.id || condition,
        type: type?.id || type,
        currency: currency?.id || currency,
        tags: tagNames,
        accessories: accessoriesArray,
        modifications: modificationsArray,
        features: featuresArray,
        conveniences: conveniencesArray,
        powers: powersArray,
      };

      try {
        console.log(updatedValues);

        const { data } = await axios.post(
          `${SERVER_BASE_URL}/advert/${id}`,
          updatedValues,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success("Advert Updated");
        setSpinner(false);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        const { errors } = error.response.data;
        displayErrorMessages(errors);
        setSpinner(false);
      }
    } else {
      try {
        const { data } = await axios.post(`${SERVER_BASE_URL}/advert`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Almost There!");
        setAdvertID(data.data?.id);
        openModal(setIsPaymentOptionOpen);
        setSpinner(false);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        const { errors } = error.response.data;
        displayErrorMessages(errors);
        setSpinner(false);
      }
    }
  };

  useEffect(() => {
    if (selectedCategory == null && !EditMode) {
      NavigateTo("/selling");
    }
  }, []);

  useEffect(() => {
    const {
      category_spotlights_continents,
      home_spotlights_continents,
      home_spotlights_countries,
      category_spotlights_countries,
    } = Object(advert);

    const hasAnyValue =
      category_spotlights_continents?.length > 0 ||
      category_spotlights_countries?.length > 0 ||
      home_spotlights_continents?.length > 0 ||
      home_spotlights_countries?.length > 0;

    if (hasAnyValue && !EditMode) {
      setHasSpotlights(true);
    }
  }, [advertID, advert, spinner]);

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
        enableReinitialize={true}
        initialValues={
          !EditMode
            ? bigBoats.includes(selectedCategory?.name)
              ? initialValuesBoatHome
              : initialValuesJetSki
            : editValues
        }
        validationSchema={EditMode ? emptySchema : validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, values, setErrors, setTouched, setFieldValue }) => (
          <LoadingWrapper loading={EditMode ? loading : false}>
            <Form>
              {step === 1 && <ItemDescriptionStep2 isEditMode={EditMode} />}
              {step === 2 && <ItemFeaturesStep3 isEditMode={EditMode} />}
              {step === 3 && <NotesSteps4 isEditMode={EditMode} />}
              {step === 4 && <GalleryStep5 isEditMode={EditMode} />}
              {step === 5 && <PriceStep6 isEditMode={EditMode} />}
              {/* Navigation buttons */}
              <div className="flex sm:flex-row flex-col-reverse align-center justify-between mt-10 mb-24">
                <div className="sm:w-auto w-full flex gap-5 items-center sm:flex-row flex-col sm:mt-0 mt-5">
                  <Link
                    to={"/selling"}
                    type="button"
                    className="bg-white text-center sm:order-none order-1 hover:bg-[#8891B2] hover:text-white border-2 sm:w-28 min-h-[48px] w-full border-[#8891B2] text-[#8891B2] p-3 rounded-md  text-sm font-medium "
                  >
                    Cancel
                  </Link>
                  {/* <button
                  type="button"
                  className="bg-white border-2 sm:w-auto w-full hover:bg-[#0D1A8B] hover:text-white border-[#0D1A8B] text-[#0D1A8B] font-medium p-3 rounded-md text-sm"
                >
                  Save To Draft
                </button> */}
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
                      onClick={() =>
                        EditMode
                          ? nextStep()
                          : nextStepValidation(values, {
                              setTouched,
                              setErrors,
                            })
                      }
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
                width="md:w-1/2 xl:w-1/3 w-full"
              >
                <PaymentOptionModal
                  advert={advert}
                  id={advertID}
                  onClose={() => closeModal(setIsPaymentOptionOpen)}
                  hasSubscription={hasSubscription}
                  hasSpotlight={hasSpotlight}
                />
              </Modal>
            </Form>
          </LoadingWrapper>
        )}
      </Formik>
    </Layout>
  );
};

export default BuildAd;
