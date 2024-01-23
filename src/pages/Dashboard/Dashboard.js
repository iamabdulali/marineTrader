import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import PackageMessage from "../../components/Notifications/PackageMessage";
import { jetski3d, packageIcon } from "../../assets";
import { FaCross, FaTimes } from "react-icons/fa";
import WelcomeMessage from "../../components/Notifications/WelcomeMessage";
import ListingTable from "../../components/Tables/ListingTable";
import { dashboardHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";

export default function Dashboard() {
  return (
    <>
      <Layout>
        {" "}
        <PackageMessage
          className="bg-white flex items-center justify-between p-4 rounded-xl font-medium shadow-[3px]"
          image={packageIcon}
          content="Congratulations! You Have successfully subscribed to Dealer Plus Package"
          icon={<FaTimes color="#fff" />}
        />
        <WelcomeMessage
          className="text-white flex justify-between p-10 mt-5 rounded-xl"
          heading="Welcome to Trade Seller Dashboard"
          subHeading="Let’s get it started & Create your listings."
          buttonText="Create New Listing"
          image={jetski3d}
        />
        <ListingTable
          tableFor="Your Listings"
          hasSearch={true}
          backgroundWhite={true}
          sidePadding={true}
          tableHeader={dashboardHeader}
          dashboardListing={true}
        />
      </Layout>
    </>
  );
}
