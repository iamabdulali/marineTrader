import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading";
import { FaPlus, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import { star } from "../../assets";
import {
  adsubscriptionFeaturedFeatures,
  adsubscriptionPremiumFeatures,
  adsubscriptionStandardFeatures,
} from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";

export default function AdSubscription() {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heading content="Buy Ads" />
            <div className="flex items-end gap-2 text-sm bg-[#0D1A8B] text-white py-3 px-3 font-medium rounded-md">
              <img src={star} className="w-5" />
              <p>Dealer Plus</p>
            </div>
          </div>
          <Link className=" text-sm bg-[#0D1A8B] text-white py-3 px-5 font-medium rounded-md">
            Renew Subscription
          </Link>
        </div>
        <p className="text-[#11133D] text-base font-semibold mt-5">
          Subscriptions For Jet Ski
        </p>
        <AdSubscriptionComponent
          packageName="Standard"
          price="$10.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Standard package includes the following."
          variant="green"
          isStandard={true}
          featuresArray={adsubscriptionStandardFeatures}
        />
        <AdSubscriptionComponent
          packageName="Premium"
          price="$19.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Premium package includes the following."
          variant="yellow"
          isStandard={false}
          featuresArray={adsubscriptionPremiumFeatures}
        />
        <AdSubscriptionComponent
          packageName="Featured"
          price="$19.99"
          buttonText="Get Started"
          text="View Display Results"
          packageHeading="Featured package includes the following."
          variant="purple"
          isStandard={false}
          featuresArray={adsubscriptionFeaturedFeatures}
        />
      </Layout>
    </>
  );
}
