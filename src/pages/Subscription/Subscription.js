import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import CurrentSubscription from "../../components/Subscriptions/CurrentSubscription";
import { DealerPlus, ServicePlus } from "../../utils/DummyData";
import SubscriptionStep2 from "./SubscriptionStep2";
import { FaArrowLeft } from "react-icons/fa";
import VideoModal from "../../components/VideoTutorial/VideoModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import Modal from "../../components/Modal";
import VideoBtn from "../../components/VideoTutorial/VideoBtn";
import { fetchOptions } from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";
import { categoriesList } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

const Subscription = () => {
  const [hasSubscription, setHasSubscription] = useState(true);
  let [isVideoOpen, setIsVideoOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subscription, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions("categories", setCategories);
    fetchOptions("subscriptions", setSubscriptions, setLoading);
  }, []);

  const { selectedCategory } = useContext(AuthContext);

  const featuresArray = [
    {
      "Broker plus": DealerPlus,
    },
    {
      "Service plus": ServicePlus,
    },
  ];

  const featuresObject = featuresArray.reduce((acc, obj) => {
    const key = Object.keys(obj)[0];
    acc[key] = obj[key];
    return acc;
  }, {});

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading content="Subscriptions" />
        {hasSubscription ? (
          ""
        ) : (
          <Link
            onClick={() => {
              setHasSubscription(true);
            }}
            className=" text-[#0D1A8B] flex items-center gap-2 font-medium underline"
          >
            <FaArrowLeft size={15} />
            <span className="sm:block hidden">Back To Subscriptions</span>
          </Link>
        )}
      </div>
      {hasSubscription ? (
        <p className="font-semibold text-sm text-[#11133D] my-3">
          Select a category to see their plans
        </p>
      ) : (
        ""
      )}

      <LoadingWrapper loading={loading}>
        <div className="overflow-x-scroll category-menu">
          <CategoryList
            initialCategory={-1}
            className="flex lg:w-full min-h-[88px] mt-5 justify-between px-4 bg-white border-2 rounded-lg border-[#D9DFF5] smallLg:w-auto w-[1300px]"
            activeCategory="border-b-4 border-[#0D1A8B] py-3"
            unActiveCategory="py-3"
            onCategoryChange={(category) => {
              setHasSubscription(false);
            }}
            onCategoryClick={() => {}}
            categories={categories}
          />
        </div>
        {hasSubscription ? (
          <div>
            {subscription.map(({ subscription_plan, end_date, id }, index) => {
              const { category_id, name } = subscription_plan;
              return (
                <div key={index}>
                  <p className="font-semibold text-[#11133D] my-5">
                    Subscription For {categoriesList[category_id]}
                  </p>
                  <CurrentSubscription
                    packageName={name}
                    categoryId={category_id}
                    category={categoriesList[category_id]}
                    isStandard={false}
                    featuresArray={featuresObject[name] || ServicePlus}
                    expiry_date={end_date}
                    id={id}
                    setHasSubscription={setHasSubscription}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <SubscriptionStep2 selectedCategory={selectedCategory?.name} />
        )}
      </LoadingWrapper>
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

export default Subscription;
