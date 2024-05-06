import React, { useContext, useEffect, useState } from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import Tabs from "../../components/Tabs";
import {
  checkCategorySubscription,
  fetchOptions,
} from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { categoriesList } from "../..";

const SubscriptionStep2 = () => {
  const [selectedTab, setSelectedTab] = useState("Broker plus");
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsPlan, setSubscriptionsPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [hasActiveSubscriptionData, setHasActiveSubscriptionData] = useState(
    []
  );
  const navigate = useNavigate();

  const tabs = [
    {
      id: "Broker plus",
      label: "Broker plus",
    },
    {
      id: "Service plus",
      label: "Service plus",
    },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const { selectedCategory, currencyRates, user } = useContext(AuthContext);
  const { currency } = Object(user);

  const categoryToCheck =
    selectedCategory?.id || categoriesList.indexOf(selectedCategory.name);

  useEffect(() => {
    fetchOptions("subscriptions", setSubscriptions, setLoading);
    fetchOptions(
      `subscription-plans?category=${selectedCategory?.id || categoryToCheck}`,
      setSubscriptionsPlans,
      setLoading
    );
  }, [selectedCategory]);

  useEffect(() => {
    checkCategorySubscription(
      subscriptions,
      categoryToCheck,
      setHasActiveSubscription,
      setHasActiveSubscriptionData
    );
  }, [selectedCategory, subscriptions]);

  return (
    <>
      <LoadingWrapper
        className="top-44 xl:-translate-x-0 -translate-x-1/2"
        loading={loading}
      >
        <Heading
          content={`Select ${categoriesList[categoryToCheck]} Subscription Plan`}
          className="mt-8 capitalize sm:hidden block"
          fontSize={true}
        />
        <Heading
          content={`Select ${categoriesList[categoryToCheck]} Subscription Plan`}
          className="mt-8 capitalize hidden sm:flex"
          fontSize={false}
        />
        {console.log(subscriptionsPlan)}
        <div className="lg:flex hidden gap-5 mt-10 pb-20">
          {subscriptionsPlan?.map(({ name, amount, id, ...props }, index) => {
            return (
              <Subscriptions
                key={id}
                id={id}
                featuresArray={props}
                packagePrice={amount}
                packageName={name}
                subHeading="/12 months package"
                textColor={
                  name == "Broker plus" ? "text-[#36B37E]" : "text-[#FFB800]"
                }
                borderColor={
                  name == "Broker plus"
                    ? "border-[#36B37E]"
                    : "border-[#FFB800]"
                }
                selectedSubscription={hasActiveSubscriptionData}
              />
            );
          })}
        </div>

        <div>
          <Tabs
            className="lg:hidden bg-white justify-around block border-2 mt-8  rounded-md"
            tabs={tabs}
            selectedTab={selectedTab}
            handleTabClick={handleTabClick}
          />
          <div className="lg:hidden block pt-10 pb-20">
            {subscriptionsPlan?.map(({ name, amount, id, ...props }, index) => {
              return (
                selectedTab === name && (
                  <Subscriptions
                    key={id}
                    selectedSubscription={hasActiveSubscriptionData}
                    id={id}
                    featuresArray={props}
                    packagePrice={amount}
                    packageName={name}
                    subHeading="/12 months package"
                    textColor={
                      name == "Broker plus"
                        ? "text-[#36B37E]"
                        : "text-[#FFB800]"
                    }
                    borderColor={
                      name == "Broker plus"
                        ? "border-[#36B37E]"
                        : "border-[#FFB800]"
                    }
                  />
                )
              );
            })}
          </div>
        </div>
      </LoadingWrapper>
    </>
  );
};

export default SubscriptionStep2;
