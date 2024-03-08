import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import {
  adsubscriptionFeaturedFeatures,
  adsubscriptionPremiumFeatures,
  adsubscriptionStandardFeatures,
} from "../../utils/DummyData";
import Tabs from "../../components/Tabs";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

export default function AdSubscription() {
  const [selectedTab, setSelectedTab] = useState("standard");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

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

  const getPackages = async () => {
    try {
      const { data } = await axios.get(`${SERVER_BASE_URL}/advert-packages`);
      setLoading(false);
      setPackages(data.data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setLoading(true);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const featuresArray = [
    adsubscriptionStandardFeatures,
    adsubscriptionPremiumFeatures,
    adsubscriptionFeaturedFeatures,
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heading content="Choose An Ad" />
        </div>
      </div>
      <div className="lg:flex gap-8 hidden">
        <LoadingWrapper className="top-44" loading={loading}>
          {packages.map(({ name, amount, id, ...props }) => {
            // console.log(props);
            return (
              <AdSubscriptionComponent
                featuresArray={featuresArray[id - 1]}
                packageName={name}
                variant={name}
                price={`£${amount}`}
                buttonText="Get Started"
                text="View Display Results"
                key={id}
              />
            );
          })}
        </LoadingWrapper>

        {/* <AdSubscriptionComponent
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
        /> */}
      </div>
      <div>
        <Tabs
          className="lg:hidden bg-white justify-between block border-2 mt-8  rounded-md"
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        {/* <div className="lg:hidden block py-10">
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
        </div> */}
      </div>
    </>
  );
}
