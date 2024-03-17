import React, { useContext, useEffect, useState } from "react";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import Heading from "../../components/Heading";
import { DealerPlus, ServicePlus, StandardTrade } from "../../utils/DummyData";
import Tabs from "../../components/Tabs";
import { fetchOptions } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { AuthContext } from "../../Context/AuthContext";

const SubscriptionStep2 = () => {
  const [selectedTab, setSelectedTab] = useState("Broker plus");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define default values for packageName and price
  let packageName = "Broker Plus";
  let price = "£400";

  // Check if the selected category matches any of the specified categories
  // if (
  //   selectedCategory === "Jetski" ||
  //   selectedCategory === "Small Craft" ||
  //   selectedCategory === "RIB" ||
  //   selectedCategory === "Non Motor"
  // ) {
  //   packageName = "Dealer Plus";
  //   price = "£200";
  // }

  const tabs = [
    {
      id: "Broker plus",
      label: "Broker plus",
    },
    {
      id: "Service plus",
      label: "Service plus",
    },
  ];
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const { selectedCategory } = useContext(AuthContext);

  useEffect(() => {
    fetchOptions(
      `subscription-plans?category=${selectedCategory?.id || "1"}`,
      setSubscriptions,
      setLoading
    );
  }, [selectedCategory]);

  console.log(subscriptions);

  const featuresArray = [DealerPlus, ServicePlus];

  return (
    <>
      <Heading content="Select Subscription Plan" className="mt-8" />
      <div className="lg:flex hidden gap-5 mt-10">
        <LoadingWrapper className="top-44" loading={loading}>
          {subscriptions?.map(({ name, amount, id }, index) => {
            // if (id == 1) {
            //   return;
            // }
            return (
              <Subscriptions
                key={id}
                id={id}
                featuresArray={featuresArray[index]}
                packagePrice={`£${Number(amount).toFixed(0)}`}
                packageName={name}
                subHeading="/12 months package"
                textColor={
                  name == "Broker plus" ? "text-[#36B37E]" : "text-[#FFB800]"
                }
                borderColor={
                  name == "Broker plus"
                    ? "border-[#36B37E]"
                    : "border-[#FFB800]"
                }
              />
            );
          })}
        </LoadingWrapper>
        {/* <Subscriptions
          featuresArray={DealerPlus}
          packagePrice={price}
          packageName={packageName}
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
        /> */}
      </div>
      <div>
        <Tabs
          className="lg:hidden bg-white justify-around block border-2 mt-8  rounded-md"
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
        />
        <div className="lg:hidden block py-10">
          <LoadingWrapper loading={loading}>
            {console.log(selectedTab)}
            {subscriptions?.map(({ name, amount, id }, index) => {
              // let featuresArray = [];
              // switch (name) {
              //   case "Dealer Plus":
              //     featuresArray = adsubscriptionStandardFeatures;
              //     break;
              //   case "Premium":
              //     featuresArray = adsubscriptionPremiumFeatures;
              //     break;
              //   case "Featured":
              //     featuresArray = adsubscriptionFeaturedFeatures;
              //     break;
              //   default:
              //     featuresArray = [];
              // }
              return (
                selectedTab === name && (
                  <Subscriptions
                    key={id}
                    id={id}
                    featuresArray={featuresArray[index]}
                    packagePrice={`£${Number(amount).toFixed(0)}`}
                    packageName={name}
                    subHeading="/12 months package"
                    textColor={
                      name == "Broker plus"
                        ? "text-[#36B37E]"
                        : "text-[#FFB800]"
                    }
                    borderColor={
                      name == "Broker plus"
                        ? "border-[#36B37E]"
                        : "border-[#FFB800]"
                    }
                  />
                )
              );
            })}
          </LoadingWrapper>
        </div>
      </div>
    </>
  );
};

export default SubscriptionStep2;
