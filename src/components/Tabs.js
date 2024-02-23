// Tabs.js
import React from "react";

const Tabs = ({ tabs, selectedTab, handleTabClick, className }) => {
  return (
    <div className={`flex  ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`sm:py-5 py-3 w-4/12 text-center cursor-pointer ${
            selectedTab === tab.id
              ? "text-[#0D1A8B] border-b-2 border-[#0D1A8B] font-semibold"
              : "text-[#8891B2] "
          } `}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
