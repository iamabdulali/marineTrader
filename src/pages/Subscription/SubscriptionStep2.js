import React, { useEffect, useState } from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import { DealerPlus, ServicePlus, StandardTrade } from "../../utils/DummyData";
import Tabs from "../../components/Tabs";
import { fetchOptions } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";

const SubscriptionStep2 = ({ selectedCategory }) => {
  const [selectedTab, setSelectedTab] = useState("dealerPlus");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define default values for packageName and price
  let packageName = "Broker Plus";
  let price = "£400";

  // Check if the selected category matches any of the specified categories
  if (
    selectedCategory === "Jetski" ||
    selectedCategory === "Small Craft" ||
    selectedCategory === "RIB" ||
    selectedCategory === "Non Motor"
  ) {
    packageName = "Dealer Plus";
    price = "£200";
  }

  const tabs = [
    {
      id: "dealerPlus",
      label: "Dealer Plus",
    },
    {
      id: "servicePlus",
      label: "Service Plus",
    },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    fetchOptions("subscription-plans", setSubscriptions, setLoading);
  }, []);

  const featuresArray = [DealerPlus, ServicePlus];

  console.log(featuresArray[1]);

  return (
    <>
      <Heading content="Select Subscription Plan" className="mt-8" />
      <div className="lg:flex hidden gap-5 mt-10">
        <LoadingWrapper className="top-44" loading={loading}>
          {subscriptions.map(({ name, amount, id, ...props }, index) => {
            if (id == 1) {
              return;
            }
            console.log(index);
            return (
              <Subscriptions
                id={id}
                featuresArray={featuresArray[index - 1]}
                packagePrice={`£${Number(amount).toFixed(0)}`}
                packageName={name}
                subHeading="/12 months package"
                textColor={
                  name == "Broker plus" ? "text-[#36B37E]" : "text-[#FFB800]"
                }
                borderColor="border-[#36B37E]"
              />
            );
          })}
        </LoadingWrapper>
        {/* <Subscriptions
          featuresArray={DealerPlus}
          packagePrice={price}
          packageName={packageName}
          subHeading="/12 months package"
          textColor="text-[#36B37E]"
          borderColor="border-[#36B37E]"
        />
        <Subscriptions
          featuresArray={ServicePlus}
          packagePrice="£125"
          packageName="Service Plus"
          subHeading="/12 months package"
          textColor="text-[#FFB800]"
          borderColor="border-[#FFB800]"
        /> */}
      </div>
      <div>
        <Tabs
          className="lg:hidden bg-white justify-around block border-2 mt-8  rounded-md"
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        <div className="lg:hidden block py-10">
          {selectedTab === "dealerPlus" && (
            <Subscriptions
              featuresArray={DealerPlus}
              packagePrice={price}
              packageName={packageName}
              subHeading="/12 months package"
              textColor="text-[#36B37E]"
              borderColor="border-[#36B37E]"
            />
          )}
          {selectedTab === "servicePlus" && (
            <Subscriptions
              featuresArray={ServicePlus}
              packagePrice="£125"
              packageName="Service Plus"
              subHeading="/12 months package"
              textColor="text-[#FFB800]"
              borderColor="border-[#FFB800]"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SubscriptionStep2;
