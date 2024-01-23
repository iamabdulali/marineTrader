import React from "react";
import Header from "../../components/Header/Header";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <Header />
      <VerticalMenu />
      <div className="ml-72 py-8 px-8">{children}</div>
    </div>
  );
};

export default Layout;
