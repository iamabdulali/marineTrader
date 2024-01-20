import { jetski2, jetski3d } from "../assets";

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
