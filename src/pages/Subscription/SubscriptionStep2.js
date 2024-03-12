import React, { useState } from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import { DealerPlus, ServicePlus, StandardTrade } from "../../utils/DummyData";
import Tabs from "../../components/Tabs";

const SubscriptionStep2 = ({ selectedCategory }) => {
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

  const [selectedTab, setSelectedTab] = useState("dealerPlus");

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

  return (
    <>
      <Heading content="Select Subscription Plan" className="mt-8" />
      <div className="lg:flex hidden gap-5 mt-10">
        <Subscriptions
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
        />
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
