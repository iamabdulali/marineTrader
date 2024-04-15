import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";
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
import axios from "axios";
import { SERVER_BASE_URL } from ".";
import ForgetPassword from "./pages/resetPassword/ForgetPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { messaging } from "./utils/firebaseSetup";
import { getToken, onMessage } from "firebase/messaging";
import Message from "./components/Message";
import ContactUs from "./pages/ContactPage/ContactUs";

function App() {
  const {
    selectedCategory,
    userLocationDetails,
    user,
    dispatch,
    isAuthenticated,
    refresh,
  } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getUserData(user, dispatch, token);
  }, [isAuthenticated, refresh]);

  const getIp = async () => {
    const { data } = await axios.get("https://api.ipify.org?format=json");
    return data.ip;
  };

  useEffect(() => {
    async function fetchDetailsUsingIP(params) {
      const IP_ADDRESS = await getIp();
      const { data } = await axios.get(`http://ip-api.com/json/${IP_ADDRESS}`);
      dispatch({ type: "USER_DETAILS", payload: data });
    }
    fetchDetailsUsingIP();

    async function fetchCurrencyRates(params) {
      const { data } = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/GBP`
      );
      dispatch({ type: "CURRENCY_RATES", payload: data?.rates });
    }
    fetchCurrencyRates();
    async function fetchOptions(url, type) {
      const { data } = await axios.get(`${SERVER_BASE_URL}/${url}`);
      dispatch({ type: type, payload: data.data });
    }
    fetchOptions("countries", "SPOTLIGHT_COUNTRIES");
  }, []);

  const paths = ["/subscriptions", "/contact"];

  useEffect(() => {
    async function fetchOptions(url, type) {
      const { data } = await axios.get(
        `${SERVER_BASE_URL}/${url}?category_id=${selectedCategory?.id}`
      );
      dispatch({ type: type, payload: data.data });
    }

    fetchOptions("categories", "CATEGORIES");
    if (!paths.includes(window.location.pathname)) {
      fetchOptions("make", "MAKES");
      fetchOptions("conditions", "CONDITIONS");
      fetchOptions("types", "TYPES");
      fetchOptions("currencies", "CURRENCY");
      fetchOptions("taxes", "TAXES");
    }
  }, [selectedCategory]);

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        // vapidKey:
        //   "BAiqc7-uEWMc08ecnXYznT5NUPsYlsq5StIPpwPQV5Q9HSmNLU_Zkqmop64QJ2tt3ZeexvHK3j0ZWKIisuy-Hek",
      });

      //We can send token to server
      console.log("Token generated : ", token);
      dispatch({ type: "FCM_TOKEN", payload: token });
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const storedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
    dispatch({
      type: "SELECTED_COUNTRY",
      payload: storedCountry || {},
    });
  }, []);

  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);
  });

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
        <Route path="/forget-password" element={<ForgetPassword />} />
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
          path="/payment/advert-upgrade/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/bundle/:id"
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
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
