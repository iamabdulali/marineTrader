import {
  FaCheck,
  FaDollarSign,
  FaEye,
  FaPencilAlt,
  FaTicketAlt,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import {
  base,
  base1,
  base2,
  greenNotification,
  jetski2,
  jetski3d,
  purpleNotification,
  sliderImage,
  thumb1,
  thumb2,
  thumb3,
  thumb4,
  thumb5,
  thumb6,
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
export const SpotLightListingsData2 = [
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

export const StandardTrade = [
  {
    id: 1,
    featureName: "Cheaper advert costs",
    standOut: false,
  },
];

export const DealerPlus = [
  {
    id: 1,
    featureName: "Ads/Month",
    standOut: true,
    numberOfAds: 15,
  },
  {
    id: 5,
    featureName: "3x Listings in Business Plus+ Directory",
    standOut: true,
  },
  {
    id: 2,
    featureName: "Virtual Showroom",
    standOut: false,
  },
  {
    id: 3,
    featureName: "Customer Reviews",
    standOut: false,
  },
  {
    id: 4,
    featureName: "Website Link",
    standOut: false,
  },
  {
    id: 6,
    featureName: "Picture Gallery",
    standOut: false,
  },
  {
    id: 7,
    featureName: "Enables Promotional Discount Offers",
    standOut: false,
  },
];

export const ServicePlus = [
  {
    id: 5,
    featureName: "3x Listings in Business Plus+ Directory",
    standOut: true,
  },
  {
    id: 1,
    featureName: "Company Profile",
    standOut: false,
  },
  {
    id: 2,
    featureName: "Picture Gallery",
    standOut: false,
  },
  {
    id: 3,
    featureName: "Customer Reviews",
    standOut: false,
  },
  {
    id: 4,
    featureName: "Website Link",
    standOut: false,
  },

  {
    id: 6,
    featureName: "Access to list in News and Events",
    standOut: false,
  },
  {
    id: 7,
    featureName: "Enables Promotional Discount Offers",
    standOut: false,
  },
];

export const AfroStyles = [
  {
    id: 1,
    title: "Model 1",
    alt: "First Image",
    src: sliderImage,
  },
  {
    id: 2,
    title: "Model 2",

    alt: "Second Image",
    src: "https://images.unsplash.com/photo-1564633351631-e85bd59a91af?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Model 3",
    alt: "Third Image",
    src: "https://images.unsplash.com/photo-1574863226228-0f7ad00fcfe0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Model 4",
    alt: "Forth Image",
    src: "https://images.unsplash.com/photo-1635068255660-22c0cecdb922?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Model 5",
    alt: "Fifth Image",
    src: "https://images.unsplash.com/photo-1567709042753-4562f9928608?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Model 6",
    alt: "Sixth Image",
    src: "https://images.unsplash.com/photo-1638100191048-33f8e6d07505?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const links = [
  {
    href: "/list",
    label: (
      <>
        <FaEye /> View
      </>
    ),
    colorChange: false,
    onClick: false,
  },
  {
    href: "/selling/buildAd",
    label: (
      <>
        <FaPencilAlt /> Edit
      </>
    ),
    colorChange: false,
    onClick: false,
  },
  {
    href: "/selling",
    label: (
      <>
        <FaTrashAlt /> Delete
      </>
    ),
    colorChange: true,
    onClick: true,
  },
];

const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
  1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973,
  1972, 1971, 1970,
];

export const yearsArray = years.map((year, index) => {
  return { id: year, name: year };
});

export const colors = [
  { id: 1, name: "Black" },
  { id: 2, name: "Blue" },
  { id: 3, name: "Red" },
  { id: 4, name: "Yellow" },
  { id: 5, name: "Orange" },
  { id: 6, name: "Grey" },
  { id: 7, name: "Purple" },
  { id: 8, name: "White" },
  { id: 9, name: "Cream" },
  { id: 10, name: "Brown" },
  { id: 11, name: "Green" },
  { id: 12, name: "Pink" },
  { id: 13, name: "Silver" },
  { id: 14, name: "Gold" },
];

export const serviceHistory = [
  { id: 1, name: "None" },
  { id: 2, name: "Part" },
  { id: 3, name: "Full" },
  { id: 4, name: "Month" },
  { id: 5, name: "Repaired" },
];

export const passengers = [
  { id: 1, name: "Passenger One" },
  { id: 2, name: "Passenger Two" },
  { id: 3, name: "Passenger Three" },
];

export const trailers = [
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
  { id: 3, name: "Sold Separately" },
];

export const tax = [
  {
    id: 1,
    name: "Tax Exempt",
  },
  {
    id: 2,
    name: "Tax Not Paid",
  },
  {
    id: 3,
    name: "Inc. VAT",
  },
  {
    id: 4,
    name: "Ex. VAT",
  },
  {
    id: 5,
    name: "No VAT",
  },
];
