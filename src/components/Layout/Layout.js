import React, { useState } from "react";
import Header from "../../components/Header/Header";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";

const Layout = ({ children }) => {
  const [menuState, setMenuState] = useState(true);

  // Function to update menu state
  const handleMenuStateChange = (newState) => {
    setMenuState(newState);
  };

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <Header menuState={menuState} setMenuState={handleMenuStateChange} />
      <VerticalMenu
        menuState={menuState}
        setMenuState={handleMenuStateChange}
      />
      <div className="xl:ml-72 ml-0 py-8 sm:px-8 px-4">{children}</div>
    </div>
  );
};

export default Layout;
