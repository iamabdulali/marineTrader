import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import CurrentSubscription from "../../components/Subscriptions/CurrentSubscription";
import { ServicePlus } from "../../utils/DummyData";
import SubscriptionStep2 from "./SubscriptionStep2";
import { FaArrowLeft } from "react-icons/fa";

const Subscription = () => {
  const [hasSubscription, setHasSubscription] = useState(true);
  const [category, setCategory] = useState("Jet Skis");
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading content="Subscriptions" />
        {hasSubscription ? (
          ""
        ) : (
          <Link
            onClick={() => {
              setHasSubscription(true);
            }}
            className=" text-[#0D1A8B] flex items-center gap-2 font-medium underline"
          >
            <FaArrowLeft size={15} />
            Back To Subscriptions
          </Link>
        )}
      </div>
      <p className="font-semibold text-sm text-[#11133D] my-3">
        Select a category to see their plans
      </p>

      <div className="overflow-x-scroll category-menu">
        <CategoryList
          initialCategory={-1}
          className="flex lg:w-full min-h-[80px] mt-5 justify-between px-4 bg-white border-2 rounded-lg border-[#D9DFF5] smallLg:w-auto w-[1300px]"
          activeCategory="border-b-4 border-[#0D1A8B] py-3"
          unActiveCategory="py-3"
          onCategoryChange={(category) => {
            setHasSubscription(false);
            setCategory(category);
          }}
          onCategoryClick={() => {}}
        />
      </div>

      {hasSubscription ? (
        <div>
          <p className="font-semibold text-[#11133D] my-5">
            Subscription For {category}
          </p>

          <CurrentSubscription
            category={category}
            isStandard={false}
            featuresArray={ServicePlus}
          />
        </div>
      ) : (
        <SubscriptionStep2 selectedCategory={category} />
      )}
    </Layout>
  );
};

export default Subscription;
