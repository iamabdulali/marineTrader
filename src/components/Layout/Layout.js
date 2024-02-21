import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import VerticalMenu from "../../components/verticalMenu/VerticalMenu";
import { useWindowSize } from "../../Hooks/windowResize";

const Layout = ({ children }) => {
  const [width] = useWindowSize();
  const [menuState, setMenuState] = useState(width >= 1250);

  useEffect(() => {
    // Update showFilterMenu state when the window width changes
    setMenuState(width > 1250);
  }, [width]);

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
