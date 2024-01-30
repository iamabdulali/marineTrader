import React from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import { DealerPlus, ServicePlus, StandardTrade } from "../../utils/DummyData";

const SubscriptionStep2 = () => {
  return (
    <>
      <Heading content="Select Subscription Plan" className="mt-14" />
      <div className="flex gap-5 mt-10">
        <Subscriptions
          featuresArray={StandardTrade}
          packagePrice="Free"
          packageName="Standard Trade"
          subHeading="/Pay as you list"
          textColor="text-[#1565D8]"
          borderColor="border-[#1565D8]"
        />
        <Subscriptions
          featuresArray={DealerPlus}
          packagePrice="£200"
          packageName="Dealer Plus"
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
    </>
  );
};

export default SubscriptionStep2;
