import React, { useEffect, useState } from "react";
import { greenNotification, warningIcon } from "../../assets";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { fetchOptions } from "../../utils/fetch/fetchData";
import TimeAgo from "../../components/TimeAgo";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { GiRadiations } from "react-icons/gi";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions(
      "notification",
      (data) => {
        // Sort notifications based on created_at timestamp
        const sortedNotifications = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNotifications(sortedNotifications);
      },
      setLoading
    );
  }, []);

  const notificationTypes = [
    {
      type: "AppModelsAdvert",
      path: "/selling",
    },
    {
      type: "AppModelsSubscription",
      path: "/subscriptions",
    },
    {
      type: "AppModelsOffer",
      path: "/offers",
    },
    {
      type: "AppModelsAlertNotification",
      path: "/selling",
    },
  ];

  return (
    <Layout>
      <p className="rounded-lg shadow-[7px] bg-white font-semibold py-5 px-7">
        Notifications{" "}
      </p>{" "}
      <div className="mt-6 shadow-[7px] bg-white rounded-lg p-7 max-h-[60vh] overflow-y-auto">
        <LoadingWrapper
          loading={loading}
          className="top-0 xl:-translate-x-0 -translate-x-1/2"
        >
          {notifications.map(({ body, created_at, id, notifiable_type }) => {
            console.log(notifiable_type);
            return (
              <Link
                to={notificationTypes
                  .map(({ type, path }) => {
                    const cleanedNotifiableType = notifiable_type.replace(
                      /\\/g,
                      ""
                    );

                    const generatedPath =
                      type === cleanedNotifiableType ? path : "";
                    return generatedPath;
                  })
                  .find((path) => path)} // Find the first non-empty path
                key={id}
                className="flex border-b-[1px] py-5 items-center gap-4"
              >
                <img
                  className="w-10"
                  src={
                    notifiable_type.replace(/\\/g, "") ==
                    "AppModelsAlertNotification"
                      ? warningIcon
                      : greenNotification
                  }
                  alt="Notification"
                />
                <div>
                  <p className="text-[#11133D] font-medium mb-2"> {body} </p>{" "}
                  <TimeAgo timestamp={created_at} />{" "}
                </div>{" "}
              </Link>
            );
          })}{" "}
        </LoadingWrapper>{" "}
      </div>{" "}
    </Layout>
  );
}
