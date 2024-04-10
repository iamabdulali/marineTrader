import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import Heading from "../../components/Heading";
import { Link, useNavigate } from "react-router-dom";
import CurrentSubscription from "../../components/Subscriptions/CurrentSubscription";
import { DealerPlus, ServicePlus } from "../../utils/DummyData";
import SubscriptionStep2 from "./SubscriptionStep2";
import { FaArrowLeft } from "react-icons/fa";
import {
  checkCategorySubscription,
  fetchOptions,
} from "../../utils/fetch/fetchData";
import { AuthContext } from "../../Context/AuthContext";
import { categoriesList } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

const Subscription = () => {
  const [showAllActiveSubscriptions, setShowAllActiveSubscription] =
    useState(true);
  const [loading, setLoading] = useState(true);
  const { categories } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [hasActiveSubscriptionData, setHasActiveSubscriptionData] = useState(
    []
  );

  const { selectedCategory, user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  // useEffect(() => {
  //   fetchOptions("subscriptions", setSubscriptions, setLoading);
  // }, []);

  const isPrivateSeller = seller_type == "private seller";

  useEffect(() => {
    if (isPrivateSeller) {
      navigate("/dashboard");
    }
  }, [user]);

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

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    fetchOptions("subscriptions", setSubscriptions, setLoading);
    // fetchOptions(
    //   `subscription-plans?category=${selectedCategory?.id || "1"}`,
    //   setSubscriptionsPlans,
    //   setLoading
    // );
  }, [selectedCategory]);

  useEffect(() => {
    checkCategorySubscription(
      subscriptions,
      categoryToCheck,
      setHasActiveSubscription,
      setHasActiveSubscriptionData
    );
  }, [selectedCategory, subscriptions]);

  console.log(selectedCategory);

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading content="Subscriptions" />
        {showAllActiveSubscriptions ? (
          ""
        ) : (
          <Link
            onClick={() => {
              setShowAllActiveSubscription(true);
            }}
            className=" text-[#0D1A8B] flex items-center gap-2 font-medium underline"
          >
            <FaArrowLeft size={15} />
            <span className="sm:block hidden">Back To Subscriptions</span>
          </Link>
        )}
      </div>
      {showAllActiveSubscriptions ? (
        <p className="font-semibold text-sm text-[#11133D] my-3">
          Select a category to see their plans
        </p>
      ) : (
        ""
      )}

      <LoadingWrapper
        loading={loading}
        className="top-0 xl:-translate-x-0 -translate-x-1/2"
      >
        <div className="category-menu">
          <CategoryList
            initialCategory={-1}
            className="flex smallLg:flex-nowrap smallLg:justify-between flex-wrap lg:w-full min-h-[88px] mt-5 justify-start smallLg:gap-0  gap-4 px-4 bg-white border-2 rounded-lg border-[#D9DFF5]
               smallLg:w-auto"
            activeCategory="border-b-4 border-[#0D1A8B] py-3"
            unActiveCategory="py-3"
            onCategoryChange={() => {
              setShowAllActiveSubscription(false);
            }}
            onCategoryClick={() => {}}
            categories={categories}
          />
        </div>
        {subscriptions.length == 0 && showAllActiveSubscriptions ? (
          <p className=" font-medium mt-6">
            You don't have any subscriptions at the moment
          </p>
        ) : (
          ""
        )}
        <>
          {showAllActiveSubscriptions ? (
            <div>
              {subscriptions.map(
                (
                  { subscription_plan, end_date, id, subscription_plan_id },
                  index
                ) => {
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
                        subscription_plan_id={subscription_plan_id}
                        setHasSubscription={setShowAllActiveSubscription}
                      />
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <SubscriptionStep2 selectedCategory={selectedCategory?.name} />
          )}
        </>
      </LoadingWrapper>
    </Layout>
  );
};

export default Subscription;
