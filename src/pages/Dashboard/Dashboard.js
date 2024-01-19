import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import PackageMessage from "../../components/Notifications/PackageMessage";
import { jetski3d, packageIcon } from "../../assets";
import { FaCross, FaTimes } from "react-icons/fa";
import WelcomeMessage from "../../components/Notifications/WelcomeMessage";
import ListingTable from "../../components/Tables/ListingTable";

export default function Dashboard() {
  return (
    <>
      <div className="bg-[#f6f6f6] min-h-screen">
        <Header />
        <VerticalMenu />
        <div className="ml-72 py-8 px-8">
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
          <ListingTable />
        </div>
      </div>
    </>
  );
}
