import React, { useState } from "react";
import Heading from "../../components/Heading";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import {
  adsubscriptionFeaturedFeatures,
  adsubscriptionPremiumFeatures,
  adsubscriptionStandardFeatures,
} from "../../utils/DummyData";
import Tabs from "../../components/Tabs";

export default function AdSubscription() {
  const [selectedTab, setSelectedTab] = useState("standard");

  const tabs = [
    {
      id: "standard",
      label: "Standard",
    },
    {
      id: "premium",
      label: "Premium",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heading content="Choose Your Ads" />
        </div>
      </div>
      <div className="lg:flex gap-8 hidden">
        <AdSubscriptionComponent
          packageName="Standard"
          price="£10.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Standard package includes the following."
          variant="green"
          isStandard={true}
          featuresArray={adsubscriptionStandardFeatures}
        />
        <AdSubscriptionComponent
          packageName="Premium"
          price="£19.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Premium package includes the following."
          variant="yellow"
          isStandard={false}
          featuresArray={adsubscriptionPremiumFeatures}
        />
        <AdSubscriptionComponent
          packageName="Featured"
          price="£19.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Featured package includes the following."
          variant="purple"
          isStandard={false}
          featuresArray={adsubscriptionFeaturedFeatures}
        />
      </div>
      <div>
        <Tabs
          className="lg:hidden justify-between block border-2 mt-8  rounded-md"
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        <div className="lg:hidden block py-10">
          {selectedTab === "standard" && (
            <AdSubscriptionComponent
              packageName="Standard"
              price="£10.99"
              buttonText="Get Started"
              text="View Display Results"
              packageHeading="Standard package includes the following."
              variant="green"
              isStandard={true}
              featuresArray={adsubscriptionStandardFeatures}
            />
          )}
          {selectedTab === "premium" && (
            <AdSubscriptionComponent
              packageName="Premium"
              price="£19.99"
              buttonText="Get Started"
              text="View Display Results"
              packageHeading="Premium package includes the following."
              variant="yellow"
              isStandard={false}
              featuresArray={adsubscriptionPremiumFeatures}
            />
          )}
          {selectedTab === "featured" && (
            <AdSubscriptionComponent
              packageName="Featured"
              price="£19.99"
              buttonText="Get Started"
              text="View Display Results"
              packageHeading="Featured package includes the following."
              variant="purple"
              isStandard={false}
              featuresArray={adsubscriptionFeaturedFeatures}
            />
          )}
        </div>
      </div>
    </>
  );
}
