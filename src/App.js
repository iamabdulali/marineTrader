import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import TradeSeller from "./pages/Sellers/TradeSeller/tradeSeller";
import PrivateSeller from "./pages/Sellers/PrivateSeller/privateSeller";
import Selling from "./pages/Selling/Selling";
import AdSubscription from "./pages/AdSubscription/AdSubscription";
import Offer from "./pages/Offers/Offer";
import Notifications from "./pages/Notifications/Notifications";
import BuildAd from "./pages/BuildAd/BuildAd";
import Directory from "./pages/Directory/Directory";
import Subscription from "./pages/Subscription/Subscription";
import News from "./pages/News/News";
import Events from "./pages/Events/Events";
import UserInfo from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userProfile" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/selling" element={<Selling />} />
        <Route path="/selling/adsubscription" element={<AdSubscription />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/selling/buildAd" element={<BuildAd />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />

        <Route path="/trade-seller" element={<TradeSeller />} />
        <Route path="/private-seller" element={<PrivateSeller />} />
      </Routes>
    </Router>
  );
}

export default App;
