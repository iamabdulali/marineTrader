import React, { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import Tabs from "../../components/Tabs";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";
import { fetchOptions, getPackages } from "../../utils/fetch/fetchData";

export default function AdSubscription() {
  const [selectedTab, setSelectedTab] = useState("Standard");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState("");

  const [hasPremiumBundle, setHasPremiumBundle] = useState("");
  const [hasFeaturedBundle, setHasFeaturedBundle] = useState("");

  const { selectedCategory, user, currencyRates } = useContext(AuthContext);

  const { seller_type, currency } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    getPackages(setPackages, seller_type, setLoading);
  }, []);

  const sortedPackages = packages.sort((a, b) => {
    // Convert specificity_order to numbers before comparison
    const orderA = parseInt(a.specificity_order);
    const orderB = parseInt(b.specificity_order);

    // Compare the specificity_order values
    return orderA - orderB;
  });

  console.log(sortedPackages);

  const tabs = sortedPackages.map((item) => ({
    id: item.name,
    label: item.name,
  }));

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    fetchOptions(
      `bundle/advert/remains?type=premium`,
      setHasPremiumBundle,
      setLoading
    );
    fetchOptions(
      `bundle/advert/remains?type=featured`,
      setHasFeaturedBundle,
      setLoading
    );
    if (!isPrivateSeller) {
      fetchOptions(
        `subscription/advert/remains/${selectedCategory?.id}`,
        setHasActiveSubscription,
        setLoading
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
          {sortedPackages.map(
            ({ name, amount, id, specificity_order, ...props }) => {
              return (
                <AdSubscriptionComponent
                  hasPremiumBundle={hasPremiumBundle}
                  hasFeaturedBundle={hasFeaturedBundle}
                  packageName={name}
                  variant={name}
                  price={`${currency?.symbol}${Number(
                    amount * currencyRates[currency?.currency_code]
                  ).toFixed(2)}`}
                  buttonText="Get Started"
                  text="View Display Results"
                  key={id}
                  id={specificity_order}
                  hasActiveSubscription={hasActiveSubscription}
                  featuresArray={props}
                />
              );
            }
          )}
        </LoadingWrapper>
      </div>
      <div>
        <Tabs
          className="lg:hidden sm:text-base text-sm bg-white justify-between block border-2 mt-8  rounded-md"
          tabs={tabs || [{}]}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        <div className="lg:hidden block py-10">
          <LoadingWrapper loading={loading}>
            {sortedPackages.map(
              ({ name, amount, specificity_order, id, ...props }) => {
                return (
                  selectedTab === name && (
                    <AdSubscriptionComponent
                      hasPremiumBundle={hasPremiumBundle}
                      hasFeaturedBundle={hasFeaturedBundle}
                      packageName={name}
                      price={`${currency?.symbol}${Number(
                        amount * currencyRates[currency?.currency_code]
                      ).toFixed(2)}`}
                      buttonText="Get Started"
                      text="View Display Results"
                      packageHeading={`${name} package includes the following.`}
                      variant={name}
                      featuresArray={props}
                      key={id}
                      id={specificity_order}
                      hasActiveSubscription={hasActiveSubscription}
                    />
                  )
                );
              }
            )}
          </LoadingWrapper>
        </div>
      </div>
    </>
  );
}
