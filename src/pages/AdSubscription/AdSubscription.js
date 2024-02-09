import React from "react";
import Heading from "../../components/Heading";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import {
  adsubscriptionFeaturedFeatures,
  adsubscriptionPremiumFeatures,
  adsubscriptionStandardFeatures,
} from "../../utils/DummyData";

export default function AdSubscription() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heading content="Choose Your Ads" />
        </div>
      </div>
      <div className="flex gap-8">
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
    </>
  );
}
