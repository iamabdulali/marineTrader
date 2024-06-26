import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getUserData } from "./utils/getUserData";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { SERVER_BASE_URL } from ".";
import { messaging } from "./utils/firebaseSetup";
import { getToken, onMessage } from "firebase/messaging";
import Message from "./components/Message";
import ErrorBoundary from "./components/ErrorBoundary";
import { routes } from "./utils/routes";

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
    // async function fetchDetailsUsingIP(params) {
    //   const IP_ADDRESS = await getIp();
    //   const { data } = await axios.get(`http://ip-api.com/json/${IP_ADDRESS}`);
    //   dispatch({ type: "USER_DETAILS", payload: data });
    // }
    // fetchDetailsUsingIP();

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
      try {
        const { data } = await axios.get(
          `${SERVER_BASE_URL}/${url}?category_id=${selectedCategory?.id}`
        );
        dispatch({ type: type, payload: data.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchOptions("categories", "CATEGORIES");
    fetchOptions("make", "MAKES");

    const fetchData = async () => {
      try {
        // Check if the current path is not exactly "/selling" and does not match any path from the 'paths' array
        if (
          window.location.pathname !== "/selling" &&
          !paths.includes(window.location.pathname)
        ) {
          await Promise.all([
            fetchOptions("types", "TYPES"),
            fetchOptions("conditions", "CONDITIONS"),
            fetchOptions("currencies", "CURRENCY"),
            fetchOptions("taxes", "TAXES"),
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function (if needed)
    };
  }, [selectedCategory, refresh]);

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        // vapidKey:
        //   "BAiqc7-uEWMc08ecnXYznT5NUPsYlsq5StIPpwPQV5Q9HSmNLU_Zkqmop64QJ2tt3ZeexvHK3j0ZWKIisuy-Hek",
      });

      //We can send token to server
      dispatch({ type: "FCM_TOKEN", payload: token });
    } else if (permission === "denied") {
      //notifications are blocked
      console("You denied for the notification");
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
    <ErrorBoundary>
      <Router>
        {/* <Header/> */}
        <Routes>
          {routes.map(({ path, element, isAuthRequired }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  isAuthRequired ? (
                    <ProtectedRoute>{element}</ProtectedRoute>
                  ) : (
                    element
                  )
                }
              ></Route>
            );
          })}
          {/* <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/slider" element={<SwiperSlider />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/:id/list" element={<ListPage />} />
          <Route
            path="/listings/:category/:title/:id"
            element={<ItemDetailPage />}
          />

          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id/userProfile"
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
            path="/:id/dashboard"
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
          /> */}
        </Routes>
        <ToastContainer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
