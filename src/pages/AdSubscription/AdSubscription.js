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
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";

export default function AdSubscription() {
  const [selectedTab, setSelectedTab] = useState("Standard");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  const tabs = [
    {
      id: "Standard",
      label: "Standard",
    },
    {
      id: "Premium",
      label: "Premium",
    },
    {
      id: "Featured",
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
      </div>
      <div>
        <Tabs
          className="lg:hidden bg-white justify-between block border-2 mt-8  rounded-md"
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        <div className="lg:hidden block py-10">
          <LoadingWrapper loading={loading}>
            {packages.map(({ name, amount, id, ...props }) => {
              let featuresArray = [];
              switch (name) {
                case "Standard":
                  featuresArray = adsubscriptionStandardFeatures;
                  break;
                case "Premium":
                  featuresArray = adsubscriptionPremiumFeatures;
                  break;
                case "Featured":
                  featuresArray = adsubscriptionFeaturedFeatures;
                  break;
                default:
                  featuresArray = [];
              }
              return (
                selectedTab === name && (
                  <AdSubscriptionComponent
                    packageName={name}
                    price={`£${amount}`}
                    buttonText="Get Started"
                    text="View Display Results"
                    packageHeading={`${name} package includes the following.`}
                    variant={name}
                    featuresArray={featuresArray}
                    key={id}
                  />
                )
              );
            })}
          </LoadingWrapper>
        </div>
      </div>
    </>
  );
}
