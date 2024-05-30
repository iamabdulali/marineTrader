import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import Heading from "../../components/Heading";
import { Link, useNavigate } from "react-router-dom";
import CurrentSubscription from "../../components/Subscriptions/CurrentSubscription";
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

  const { selectedCategory, user, dispatch } = useContext(AuthContext);

  const { seller_type } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  useEffect(() => {
    if (isPrivateSeller) {
      navigate("/dashboard");
    }
  }, [user]);

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    fetchOptions("subscriptions", setSubscriptions, setLoading);
  }, [selectedCategory]);

  useEffect(() => {
    checkCategorySubscription(
      subscriptions,
      categoryToCheck,
      setHasActiveSubscription,
      setHasActiveSubscriptionData
    );
  }, [selectedCategory, subscriptions]);

  useEffect(() => {
    dispatch({
      type: "SELECTED_CATEGORY",
      payload: null,
    });
  }, []);

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
              dispatch({
                type: "SELECTED_CATEGORY",
                payload: null,
              });
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
        <div className="category-menu overflow-x-auto ">
          <CategoryList
            className="flex flex-nowrap justify-between lg:w-full min-h-[88px]  smallLg:gap-0 gap-4 bg-white
              sm:px-4 pl-4 pr-7  mt-3 sm:mb-6 smallLg:w-auto w-[900px] border-2 rounded-lg border-[#D9DFF5]"
            activeCategory={`${
              showAllActiveSubscriptions
                ? "py-3"
                : "border-b-4 border-[#0D1A8B] py-3"
            } `}
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
                        featuresArray={subscription_plan}
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
            // <SubscriptionStep2 selectedCategory={selectedCategory?.name} />
            <>
              {subscriptions
                .filter(
                  ({ subscription_plan }) =>
                    subscription_plan.category_id == selectedCategory?.id
                )
                .map(
                  (
                    { subscription_plan, end_date, id, subscription_plan_id },
                    index
                  ) => {
                    console.log(subscription_plan);
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
                          featuresArray={subscription_plan}
                          expiry_date={end_date}
                          id={id}
                          subscription_plan_id={subscription_plan_id}
                          setHasSubscription={setShowAllActiveSubscription}
                        />
                      </div>
                    );
                  }
                )}
              {subscriptions.filter(
                ({ subscription_plan }) =>
                  subscription_plan.category_id == selectedCategory?.id
              ).length === 0 && (
                <SubscriptionStep2 selectedCategory={selectedCategory?.name} />
              )}
            </>
          )}
        </>
      </LoadingWrapper>
    </Layout>
  );
};

export default Subscription;
