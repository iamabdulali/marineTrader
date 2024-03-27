import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../Context/AuthContext";
import {
  checkCategorySubscription,
  fetchOptions,
  getAdvert,
} from "../../utils/fetch/fetchData";

export default function AdSubscription() {
  const [selectedTab, setSelectedTab] = useState("Standard");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [subscription, setSubscriptions] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState("");
  const [hasActiveSubscriptionData, setHasActiveSubscriptionData] = useState(
    []
  );

  const [hasBundle, setHasBundle] = useState("");

  const { selectedCategory, user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    getAdvert(setAdverts, setLoading);
  }, []);

  const filterAdverts = adverts.filter((advert) => {
    return (
      advert?.category_id == selectedCategory?.id &&
      advert?.advert_package_id == "2"
    );
  });

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

  useEffect(() => {
    if (!isPrivateSeller) {
      fetchOptions("bundle/advert/remains", setHasBundle);
      fetchOptions(
        `subscription/advert/remains/${selectedCategory?.id}`,
        setHasActiveSubscription
      );
    }
  }, [categoryToCheck]);

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
                hasBundle={hasBundle}
                featuresArray={featuresArray[id - 1]}
                packageName={name}
                variant={name}
                price={`£${amount}`}
                buttonText="Get Started"
                text="View Display Results"
                key={id}
                id={id}
                hasActiveSubscription={hasActiveSubscription}
                hasActiveSubscriptionData={hasActiveSubscriptionData}
                adsPosted={filterAdverts.length}
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
                    hasBundle={hasBundle}
                    packageName={name}
                    price={`£${amount}`}
                    buttonText="Get Started"
                    text="View Display Results"
                    packageHeading={`${name} package includes the following.`}
                    variant={name}
                    featuresArray={featuresArray}
                    key={id}
                    id={id}
                    hasActiveSubscription={hasActiveSubscription}
                    hasActiveSubscriptionData={hasActiveSubscriptionData}
                    adsPosted={filterAdverts.length}
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
