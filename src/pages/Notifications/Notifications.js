import React, { useEffect, useState } from "react";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import Header from "../../components/Header/Header";
import ListingTable from "../../components/Tables/ListingTable";
import Heading from "../../components/Heading";
import { notificationsData, offersHeader } from "../../utils/DummyData";
import { greenNotification, warning } from "../../assets";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { fetchOptions } from "../../utils/fetch/fetchData";
import TimeAgo from "../../components/TimeAgo";
import LoadingWrapper from "../../utils/LoadingWrapper";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOptions("notification", setNotifications, setLoading);
  }, []);
  return (
    <>
      <Layout>
        <p className="rounded-lg shadow-[7px] bg-white font-semibold py-5 px-7">
          Notifications
        </p>
        <div className="mt-6 shadow-[7px] bg-white rounded-lg p-7 max-h-[60vh] overflow-y-auto">
          <LoadingWrapper loading={loading} className="top-0 ">
            {notifications.map(({ body, created_at, id }) => {
              return (
                <Link
                  key={id}
                  className="flex border-b-[1px] py-5 items-center gap-4"
                >
                  <img className="w-10" src={greenNotification} />
                  <div>
                    <p className="text-[#11133D] font-medium mb-2">{body}</p>
                    <TimeAgo timestamp={created_at} />
                  </div>
                </Link>
              );
            })}
          </LoadingWrapper>
        </div>
      </Layout>
    </>
  );
}
