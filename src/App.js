import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import TradeSeller from "./pages/Sellers/TradeSeller/tradeSeller";
import Selling from "./pages/Selling/Selling";
import Offer from "./pages/Offers/Offer";
import Notifications from "./pages/Notifications/Notifications";
import BuildAd from "./pages/BuildAd/BuildAd";
import Directory from "./pages/Directory/Directory";
import Subscription from "./pages/Subscription/Subscription";
import News from "./pages/News/News";
import Events from "./pages/Events/Events";
import UserInfo from "./pages/UserProfile/UserProfile";
import ListPage from "./pages/ListPage/ListPage";
import SubscriptionForm from "./pages/Subscription/SubscriptionForm";
import ItemDetailPage from "./pages/ItemsDetailPage/ItemDetailPage";
import SwiperSlider from "./pages/ItemsDetailPage/SwiperSlider";
import "swiper/swiper-bundle.css";
import Payment from "./pages/Payment/Payment";
import PaymentStatus from "./pages/Payment/PaymentStatus";
import PrivateSeller from "./pages/Sellers/PrivateSeller/privateSeller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import GuestRoute from "./utils/GuestRoute";
import { getUserData } from "./utils/getUserData";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { user, dispatch, isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getUserData(user, dispatch, token);
  }, [isAuthenticated]);

  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slider" element={<SwiperSlider />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/itemDetails/:id" element={<ItemDetailPage />} />
        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Registration />
            </GuestRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/selling"
          element={
            <ProtectedRoute>
              <Selling />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <Offer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/selling/buildAd"
          element={
            <ProtectedRoute>
              <BuildAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selling/buildAd/advert/:id"
          element={
            <ProtectedRoute>
              <BuildAd />
            </ProtectedRoute>
          }
        />
        <Route path="/directory" element={<Directory />} />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions/buySubscription"
          element={<SubscriptionForm />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />

        <Route
          path="/trade-seller"
          element={
            <GuestRoute>
              <TradeSeller />
            </GuestRoute>
          }
        />
        <Route
          path="/private-seller"
          element={
            <GuestRoute>
              <PrivateSeller />
            </GuestRoute>
          }
        />
        <Route
          path="/payment/advert/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/subscription/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentStatus"
          element={
            <ProtectedRoute>
              <PaymentStatus successStatus={true} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
