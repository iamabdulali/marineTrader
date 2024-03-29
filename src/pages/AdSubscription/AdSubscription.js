import React, { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import AdSubscriptionComponent from "../../components/AdSubscriptionComponent";
import Tabs from "../../components/Tabs";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";
import { fetchOptions } from "../../utils/fetch/fetchData";

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

  if (isPrivateSeller) {
    tabs.push({
      id: "Basic",
      label: "Basic",
    });
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const getPackages = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/advert-packages?advert_for=${seller_type}`
      );
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
          tabs={tabs}
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
