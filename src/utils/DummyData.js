import { FaCheck, FaTicketAlt, FaTimes } from "react-icons/fa";
import {
  base,
  base1,
  base2,
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
    // packageName: "Premium",
    image: jetski2,
    ad: "Edit",
  },
  {
    id: 2,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "Active",
    views: "2.8k",
    // packageName: "Premium",
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
    // packageName: "Premium",
    image: jetski2,
    ad: "Edit",
  },
  {
    id: 4,
    itemName: "Jet Ski Pro 4000",
    price: "Є70000",
    adExpireDate: "2024-01-19",
    status: "Expired",
    views: "2.8k",
    // packageName: "Premium",
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
  // { id: 3, text: "Package", textCenter: false },
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

export const SpotLightListingsData = [
  {
    id: 1,
    listingType: "Yacht",
    listingName: "Princess 72 Elite",
    listingPrice: "£55000000",
    isFeatured: true,
  },
  {
    id: 2,
    listingType: "Sailboat",
    listingName: "Oceanis 45",
    listingPrice: "£250000",
    isFeatured: false,
  },
  {
    id: 3,
    listingType: "Motorboat",
    listingName: "Sunseeker Predator 57",
    listingPrice: "£1200000",
    isFeatured: true,
  },
  {
    id: 4,
    listingType: "Catamaran",
    listingName: "Lagoon 450 F",
    listingPrice: "£500000",
    isFeatured: false,
  },
  {
    id: 5,
    listingType: "Fishing Boat",
    listingName: "Boston Whaler 280 Outrage",
    listingPrice: "£180000",
    isFeatured: true,
  },
  {
    id: 6,
    listingType: "Speedboat",
    listingName: "Sea Ray 270 Sundeck",
    listingPrice: "£75000",
    isFeatured: false,
  },
  {
    id: 7,
    listingType: "Houseboat",
    listingName: "Lakeview Houseboat",
    listingPrice: "£350000",
    isFeatured: true,
  },
  {
    id: 8,
    listingType: "Dinghy",
    listingName: "Zodiac Cadet 310",
    listingPrice: "£3000",
    isFeatured: false,
  },
  {
    id: 9,
    listingType: "Jet Ski",
    listingName: "Yamaha VX Cruiser",
    listingPrice: "£12000",
    isFeatured: true,
  },
  {
    id: 10,
    listingType: "Canoe",
    listingName: "Old Town Saranac 146",
    listingPrice: "£800",
    isFeatured: false,
  },
  {
    id: 11,
    listingType: "Kayak",
    listingName: "Perception Pescador Pro 12",
    listingPrice: "£600",
    isFeatured: true,
  },
  {
    id: 12,
    listingType: "Inflatable Boat",
    listingName: "Intex Explorer K2",
    listingPrice: "£100",
    isFeatured: false,
  },
];

export const newsData = [
  {
    id: 1,
    newsDate: "December 18, 2023",
    newsTitle: "Golden Yachts hosts ocean clean-up event at Marina Zeas",
    isNews: true,
    thumbnail: base2,
  },
  {
    id: 2,
    newsDate: "January 5, 2024",
    newsTitle: "Luxury Yacht Show 2024: Explore the Latest Trends in Yachting",
    isNews: true,
    thumbnail: base1,
  },
  {
    id: 3,
    newsDate: "February 20, 2024",
    newsTitle: "New Sustainable Technologies Introduced in Yachting Industry",
    isNews: true,
    thumbnail: base,
  },
];
