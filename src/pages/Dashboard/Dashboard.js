import React, { useState } from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import PackageMessage from "../../components/Notifications/PackageMessage";
import { jetski3d, packageIcon } from "../../assets";
import { FaCross, FaTimes } from "react-icons/fa";
import WelcomeMessage from "../../components/Notifications/WelcomeMessage";
import ListingTable from "../../components/Tables/ListingTable";
import { dashboardHeader, sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import VideoBtn from "../../components/VideoTutorial/VideoBtn";
import Modal from "../../components/Modal";
import VideoModal from "../../components/VideoTutorial/VideoModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";

export default function Dashboard() {
  let [isVideoOpen, setIsVideoOpen] = useState(false);
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
          buttonText="Start Selling Now"
          image={jetski3d}
        />
        <div className="pb-16">
          <ListingTable
            tableFor="Your Listings"
            hasSort={true}
            hasPadding={true}
            sellingListing={true}
            tableHeader={sellingHeader}
          />
        </div>
        {/* <ListingTable
          tableFor="Your Listings"
          hasSearch={true}
          backgroundWhite={true}
          sidePadding={true}
          tableHeader={dashboardHeader}
          dashboardListing={true}
        /> */}
        <VideoBtn onClick={() => openModal(setIsVideoOpen)} />
        <Modal
          isOpen={isVideoOpen}
          onClose={() => closeModal(setIsVideoOpen)}
          opacity="bg-opacity-40"
          width="w-6/12"
        >
          <VideoModal />
        </Modal>
      </Layout>
    </>
  );
}
