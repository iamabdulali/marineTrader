import React, { useState, useEffect } from "react";

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const parsedTime = new Date(timestamp);
      const timeDifference = currentTime - parsedTime;

      if (timeDifference < 60000) {
        setTimeAgo("Just now");
      } else if (timeDifference < 3600000) {
        const minutes = Math.floor(timeDifference / 60000);
        setTimeAgo(`${minutes} minute${minutes !== 1 ? "s" : ""} ago`);
      } else if (timeDifference < 86400000) {
        const hours = Math.floor(timeDifference / 3600000);
        setTimeAgo(`${hours} hour${hours !== 1 ? "s" : ""} ago`);
      } else {
        const days = Math.floor(timeDifference / 86400000);
        setTimeAgo(`${days} day${days !== 1 ? "s" : ""} ago`);
      }
    };

    calculateTimeAgo();

    // Refresh time every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-sm text-[#8891B2]">{timeAgo}</span>;
};

export default TimeAgo;
