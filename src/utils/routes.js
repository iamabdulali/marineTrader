import BuildAd from "../pages/BuildAd/BuildAd";
import ContactUs from "../pages/ContactPage/ContactUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import Directory from "../pages/Directory/Directory";
import Events from "../pages/Events/Events";
import ItemDetailPage from "../pages/ItemsDetailPage/ItemDetailPage";
import ListPage from "../pages/ListPage/ListPage";
import Login from "../pages/Login/Login";
import News from "../pages/News/News";
import Notifications from "../pages/Notifications/Notifications";
import Offer from "../pages/Offers/Offer";
import Payment from "../pages/Payment/Payment";
import Registration from "../pages/Registration/Registration";
import PrivateSeller from "../pages/Sellers/PrivateSeller/privateSeller";
import TradeSeller from "../pages/Sellers/TradeSeller/tradeSeller";
import Selling from "../pages/Selling/Selling";
import Subscription from "../pages/Subscription/Subscription";
import UserInfo from "../pages/UserProfile/UserProfile";
import ForgetPassword from "../pages/resetPassword/ForgetPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import Home from "../pages/Home/Home";

export const routes = [
  {
    path: "/",
    element: <Home />,
    isAuthRequired: false,
  },
  {
    path: "/list",
    element: <ListPage />,
    isAuthRequired: false,
  },
  {
    path: "/listings/:category/:title/:id",
    element: <ItemDetailPage />,
    isAuthRequired: false,
  },
  {
    path: "/userProfile",
    element: <UserInfo />,
    isAuthRequired: true,
  },
  {
    path: "/login",
    element: <Login />,
    isAuthRequired: false,
  },
  {
    path: "/register",
    element: <Registration />,
    isAuthRequired: false,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    isAuthRequired: true,
  },
  {
    path: "/selling",
    element: <Selling />,
    isAuthRequired: true,
  },
  {
    path: "/offers",
    element: <Offer />,
    isAuthRequired: true,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    isAuthRequired: true,
  },
  {
    path: "/selling/buildAd",
    element: <BuildAd />,
    isAuthRequired: true,
  },
  {
    path: "/selling/buildAd/advert/:id",
    element: <BuildAd />,
    isAuthRequired: true,
  },
  {
    path: "/subscriptions",
    element: <Subscription />,
    isAuthRequired: true,
  },
  {
    path: "/contact",
    element: <ContactUs />,
    isAuthRequired: true,
  },
  {
    path: "/payment/advert/:id",
    element: <Payment />,
    isAuthRequired: true,
  },
  {
    path: "/payment/advert-upgrade/:id",
    element: <Payment />,
    isAuthRequired: true,
  },
  {
    path: "/payment/subscription/:id",
    element: <Payment />,
    isAuthRequired: true,
  },
  {
    path: "/trade-seller",
    element: <TradeSeller />,
    isAuthRequired: false,
  },
  {
    path: "/private-seller",
    element: <PrivateSeller />,
    isAuthRequired: false,
  },
  {
    path: "/directory",
    element: <Directory />,
    isAuthRequired: false,
  },
  {
    path: "/news",
    element: <News />,
    isAuthRequired: false,
  },
  {
    path: "/events",
    element: <Events />,
    isAuthRequired: false,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    isAuthRequired: false,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    isAuthRequired: false,
  },
];
