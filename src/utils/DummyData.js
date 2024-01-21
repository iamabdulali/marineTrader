import { FaCheck, FaTicketAlt, FaTimes } from "react-icons/fa";
import {
  greenNotification,
  jetski2,
  jetski3d,
  purpleNotification,
  warning,
} from "../assets";

// Sample data array of objects
export const listingData = [
  {
    id: 1,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    listedDate: "2024-01-19",
    status: "Active",
    image: jetski2,
  },
  {
    id: 2,
    itemName: "Jet Ski 6X",
    price: "Є70000",
    listedDate: "2024-01-19",
    status: "Sold",
    image: jetski3d,
  },
  {
    id: 3,
    itemName: "Jet Ski Pro 9000",
    price: "Є70000",
    listedDate: "2024-01-19",
    status: "Active",
    image: jetski2,
  },
  // Add more objects as needed
];

// Sample data array of objects
export const sellingData = [
  {
    id: 1,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "In Draft",
    views: "2.8k",
    packageName: "Premium",
    image: jetski2,
    ad: "Create",
  },
  {
    id: 2,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "Active",
    views: "2.8k",
    packageName: "Premium",
    image: jetski3d,
    ad: "Upgrade",
  },
  {
    id: 3,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "In Draft",
    views: "2.8k",
    packageName: "Premium",
    image: jetski2,
    ad: "Create",
  },
  {
    id: 3,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "Expired",
    views: "2.8k",
    packageName: "Premium",
    image: jetski2,
    ad: "Renew",
  },
  // Add more objects as needed
];

export const OffersData = [
  {
    id: 1,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    buyerName: "John Williams",
    telephone: "+156498989",
    offerAmount: "£12,000",
    accept: <FaCheck />,
    reject: <FaTimes />,
    image: jetski2,
    email: "johnwilliams@gmail.com",
  },
  {
    id: 2,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    buyerName: "John Williams",
    telephone: "+156498989",
    offerAmount: "£12,000",
    accept: <FaCheck />,
    reject: <FaTimes />,
    image: jetski3d,
    email: "johnwilliams@gmail.com",
  },
  {
    id: 3,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    buyerName: "John Williams",
    telephone: "+156498989",
    offerAmount: "£12,000",
    accept: <FaCheck />,
    reject: <FaTimes />,
    image: jetski2,
    email: "johnwilliams@gmail.com",
  },
  {
    id: 4,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    buyerName: "John Williams",
    telephone: "+156498989",
    offerAmount: "£12,000",
    accept: <FaCheck />,
    reject: <FaTimes />,
    image: jetski3d,
    email: "johnwilliams@gmail.com",
  },
  // Add more objects as needed
];

export const dashboardHeader = [
  { id: 1, text: "Item", textCenter: false },
  { id: 2, text: "Price", textCenter: false },
  { id: 3, text: "Listed Date", textCenter: false },
  { id: 4, text: "Status", textCenter: true },
  { id: 5, text: "Actions", textCenter: true },
];

export const sellingHeader = [
  { id: 1, text: "Item", textCenter: false },
  { id: 2, text: "Ad Expires Date", textCenter: false },
  { id: 3, text: "Package", textCenter: false },
  { id: 4, text: "Views", textCenter: false },
  { id: 5, text: "Status", textCenter: true },
  { id: 6, text: "Ad", textCenter: true },
];

export const offersHeader = [
  { id: 1, text: "Item", textCenter: false },
  { id: 2, text: "Buyer Name", textCenter: false },
  { id: 3, text: "Email", textCenter: false },
  { id: 4, text: "Telephone", textCenter: false },
  { id: 5, text: "Offer", textCenter: false },
  { id: 6, text: "Accept/Reject", textCenter: true },
];

export const notificationsData = [
  {
    id: 1,
    notificationIcon: warning,
    notificationText: "Your subscription will be ending in 4 days, update now.",
    timeAgo: "1min ago.",
  },
  {
    id: 2,
    notificationIcon: purpleNotification,
    notificationText: "You have a new offer for “Jet Ski 600X",
    timeAgo: "3min ago.",
  },
  {
    id: 3,
    notificationIcon: greenNotification,
    notificationText: "You have a new offer for “Jet Ski 600X”",
    timeAgo: "10min ago.",
  },
  {
    id: 4,
    notificationIcon: purpleNotification,
    notificationText: "You have a new offer for “Jet Ski 600X”",
    timeAgo: "24hour ago.",
  },
  {
    id: 5,
    notificationIcon: greenNotification,
    notificationText: "You have a new offer for “Jet Ski 600X”",
    timeAgo: "2days ago.",
  },
];

export const adsubscriptionStandardFeatures = [
  "200 Character Description",
  "Up to 5 Photos",
  "Contact via email and call.",
];

export const adsubscriptionPremiumFeatures = [
  "Up to 50 Photos",
  "2 Mins Video",
  "Unlimited Description",
  "3x Search Results Boost",
  "Bold Outline Border",
  "Social Media Package.",
];

export const adsubscriptionFeaturedFeatures = [
  "Up to 50 Photos",
  "2 Mins Video",
  "Unlimited Description",
  "3x Search Results Boost",
  "Bold Outline Border",
  "Social Media Package.",
];
