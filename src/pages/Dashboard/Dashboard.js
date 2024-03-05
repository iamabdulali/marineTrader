import React, { useContext, useState } from "react";
import PackageMessage from "../../components/Notifications/PackageMessage";
import { jetski3d, packageIcon, speakerIcon } from "../../assets";
import { FaTimes } from "react-icons/fa";
import WelcomeMessage from "../../components/Notifications/WelcomeMessage";
import ListingTable from "../../components/Tables/ListingTable";
import { sellingHeader } from "../../utils/DummyData";
import Layout from "../../components/Layout/Layout";
import VideoBtn from "../../components/VideoTutorial/VideoBtn";
import Modal from "../../components/Modal";
import VideoModal from "../../components/VideoTutorial/VideoModal";
import {
  closeModal,
  openModal,
} from "../../utils/ModalOpeningClosingFunctions";
import { AuthContext } from "../../Context/AuthContext";

export default function Dashboard() {
  let [isVideoOpen, setIsVideoOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  return (
    <>
      <Layout>
        {" "}
        <PackageMessage
          className="bg-[#E7F1FA] mb-3 border-l-[6px] border-[#0D1A8B] flex items-center justify-between p-4 rounded-xl font-medium shadow-[3px] "
          image={speakerIcon}
          content="We have just launched our Premium Pro Package! Go and explore it’s
          benefits."
          icon={<FaTimes color="#fff" />}
          hasLink={true}
          LinkText="Check Now!"
          linkClass="underline font-bold text-[#0D1A8B]"
        />
        <PackageMessage
          className="bg-white flex items-center justify-between p-4 rounded-xl font-medium shadow-[3px]"
          image={packageIcon}
          content="Congratulations! You Have successfully subscribed to Dealer Plus Package"
          icon={<FaTimes color="#fff" />}
        />
        <WelcomeMessage
          className="text-white flex justify-between md:p-10 sm:py-7 sm:px-7 p-5 mt-5 rounded-xl md:items-stretch items-center"
          heading={
            seller_type == "private seller"
              ? "Welcome to Private Seller Dashboard"
              : "Welcome to Trade Seller Dashboard"
          }
          subHeading="Let’s get it started & Create your listings."
          buttonText="Start Selling Now"
          image={jetski3d}
        />
        <div className="pb-40">
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
          width="xl:w-6/12 sm:w-10/12 w-full"
        >
          <VideoModal />
        </Modal>
      </Layout>
    </>
  );
}
