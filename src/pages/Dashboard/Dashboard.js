import React, { useContext, useEffect, useState } from "react";
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
import { fetchOptions, getAdvert } from "../../utils/fetch/fetchData";
import LoadingWrapper from "../../utils/LoadingWrapper";
import Skeleton from "react-loading-skeleton";
import CountryRegionDropdown from "../../components/CountryRegionDropdown";
import {
  handleSortByDate,
  handleSortByPrice,
} from "../../utils/SortingFunctions";

export default function Dashboard() {
  let [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    fetchOptions("notification", setNotifications, setLoading);
  }, []);

  const latestNotification = notifications[notifications.length - 1];
  const { user } = useContext(AuthContext);

  const { seller_type } = Object(user);

  useEffect(() => {
    getAdvert((adverts) => {
      // Filter out completed adverts and store them in originalAdverts
      setAdverts(
        adverts.filter((advert) => advert.advert_status !== "completed")
      );
      setLoading(false);
    });
  }, []);

  const handleDelete = (idToDelete) => {
    setAdverts((prevAds) => {
      const indexToDelete = prevAds.findIndex(
        (advert) => advert.id === idToDelete
      );
      if (indexToDelete !== -1) {
        return prevAds.toSpliced(indexToDelete, 1);
      }
      return prevAds;
    });
  };

  // useEffect(() => {
  //   if (user) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [user]);

  return (
    <>
      <Layout>
        <LoadingWrapper
          loading={loading}
          className="top-0 xl:-translate-x-0 -translate-x-1/2"
        >
          {" "}
          {/* <PackageMessage
            className="bg-[#E7F1FA] mb-3 border-l-[6px] border-[#0D1A8B] flex items-center justify-between p-4 rounded-xl font-medium shadow-[3px] "
            image={speakerIcon}
            content="We have just launched our Premium Pro Package! Go and explore it’s
          benefits."
            icon={<FaTimes color="#fff" />}
            hasLink={true}
            LinkText="Check Now!"
            linkClass="underline font-bold text-[#0D1A8B]"
          /> */}
          {showNotification ? (
            notifications.length != 0 ? (
              <PackageMessage
                className="bg-white flex items-center justify-between p-4 rounded-xl font-medium shadow-[3px]"
                image={packageIcon}
                content={latestNotification?.body || <Skeleton width={200} />}
                icon={<FaTimes color="#fff" />}
                loading={loading}
                onClick={() => setShowNotification(false)}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
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
          <>
            {adverts.length != 0 ? (
              <div className="pb-56">
                <ListingTable
                  tableFor="Your Listings"
                  hasSort={true}
                  hasPadding={true}
                  sellingListing={true}
                  tableHeader={sellingHeader}
                  onDelete={handleDelete}
                  sellingData={adverts}
                  handleSortByDate={handleSortByDate}
                  handleSortByPrice={handleSortByPrice}
                  setItemsData={setAdverts}
                />
              </div>
            ) : (
              <p className="mt-10 text-center">
                You are currently running 0 Ads, choose a category to start
                selling!
              </p>
            )}
          </>
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
        </LoadingWrapper>
      </Layout>
    </>
  );
}
