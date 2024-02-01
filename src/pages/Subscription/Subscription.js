import React from "react";
import Layout from "../../components/Layout/Layout";
import CategoryList from "../../components/categoryList/CategoryList";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import CurrentSubscription from "../../components/Subscriptions/CurrentSubscription";
import { ServicePlus } from "../../utils/DummyData";

const Subscription = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Heading content="Subscriptions" />
        <Link
          to={"/subscriptions/buySubscription"}
          className="flex items-center text-sm gap-2 bg-[#0D1A8B] text-white py-3 px-5 font-medium rounded-md"
        >
          Buy New Subscription
        </Link>
      </div>
      <p className="font-semibold text-sm text-[#11133D] mb-3">
        Select A Category
      </p>
      <CategoryList
        className="flex lg:w-full min-h-[80px] justify-between px-4 bg-white border-2 rounded-lg border-[#D9DFF5] w-[1300px]"
        activeCategory="border-b-4 border-[#0D1A8B] py-3"
        unActiveCategory="py-3"
        onCategoryChange={() => {}}
        onCategoryClick={() => {}}
      />
      <p className="font-semibold text-[#11133D] my-5">
        Subscription For Jet Ski's
      </p>
      <CurrentSubscription isStandard={true} featuresArray={ServicePlus} />
    </Layout>
  );
};

export default Subscription;
