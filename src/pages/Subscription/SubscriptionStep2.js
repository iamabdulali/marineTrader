import React, { useContext, useEffect, useState } from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import { DealerPlus, ServicePlus, StandardTrade } from "../../utils/DummyData";
import Tabs from "../../components/Tabs";
import {
  checkCategorySubscription,
  fetchOptions,
} from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const { selectedCategory } = useContext(AuthContext);
  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    fetchOptions("subscriptions", setSubscriptions, setLoading);
  }, [selectedCategory]);

  useEffect(() => {
    fetchOptions(
      `subscription-plans?category=${selectedCategory?.id || "1"}`,
      setSubscriptionsPlans,
      setLoading
    );
    checkCategorySubscription(
      subscriptions,
      categoryToCheck,
      setHasActiveSubscription,
      setHasActiveSubscriptionData
    );

    if (hasActiveSubscriptionData?.subscription_plan_id == "2") {
      navigate("/dashboard");
      toast.error("You are already subscribed to the highest package");
    }
  }, [selectedCategory, subscriptions]);

  const featuresArray = [DealerPlus, ServicePlus];

  return (
    <>
      <LoadingWrapper className="top-44" loading={loading}>
        <Heading content="Select Subscription Plan" className="mt-8" />
        <div className="lg:flex hidden gap-5 mt-10 pb-20">
          {subscriptionsPlan?.map(({ name, amount, id }, index) => {
            return (
              <Subscriptions
                key={id}
                id={id}
                featuresArray={featuresArray[index]}
                packagePrice={`£${Number(amount).toFixed(0)}`}
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
            {subscriptionsPlan?.map(({ name, amount, id }, index) => {
              return (
                selectedTab === name && (
                  <Subscriptions
                    key={id}
                    id={id}
                    featuresArray={featuresArray[index]}
                    packagePrice={`£${Number(amount).toFixed(0)}`}
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
