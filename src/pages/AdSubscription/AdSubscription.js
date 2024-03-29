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

  const [hasBundle, setHasBundle] = useState("");

  const { selectedCategory, user, currencyRates } = useContext(AuthContext);

  const { seller_type, currency } = Object(user);

  const isPrivateSeller = seller_type == "private seller";

  const categoryToCheck = selectedCategory?.id;

  useEffect(() => {
    getPackages(setPackages, seller_type, setLoading);
  }, []);

  const tabs = packages.map((item) => ({
    id: item.name,
    label: item.name,
  }));

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    fetchOptions("bundle/advert/remains", setHasBundle);
    if (!isPrivateSeller) {
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
                packageName={name}
                variant={name}
                price={`${currency?.symbol}${Number(
                  amount * currencyRates[currency?.currency_code]
                ).toFixed(2)}`}
                buttonText="Get Started"
                text="View Display Results"
                key={id}
                id={id}
                hasActiveSubscription={hasActiveSubscription}
                featuresArray={props}
              />
            );
          })}
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
            {packages.map(({ name, amount, id, ...props }) => {
              return (
                selectedTab === name && (
                  <AdSubscriptionComponent
                    hasBundle={hasBundle}
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
                    id={id}
                    hasActiveSubscription={hasActiveSubscription}
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
