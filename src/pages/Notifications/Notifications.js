import React from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { notificationsData, offersHeader } from "../../utils/DummyData";
import { warning } from "../../assets";

export default function Notifications() {
  return (
    <>
      <div className="bg-[#f6f6f6] min-h-screen">
        <Header />
        <VerticalMenu />
        <div className="ml-72 py-8 px-8">
          <p className="rounded-lg shadow-[7px] bg-white font-semibold py-5 px-7">
            Notifications
          </p>
          <div className="mt-6 shadow-[7px] bg-white rounded-lg p-7">
            {notificationsData.map(
              ({ notificationIcon, notificationText, timeAgo }) => {
                return (
                  <div className="flex border-b-[1px] py-5 items-center gap-3">
                    <img className="w-10" src={notificationIcon} />
                    <div>
                      <p className="text-[#11133D] font-medium mb-2">
                        {notificationText}
                      </p>
                      <p className="text-[#8891B2] text-xs">{timeAgo}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
