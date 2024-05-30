import {
  FaEye,
  FaPencilAlt,
  FaStackExchange,
  FaTrashAlt,
} from "react-icons/fa";

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

export const links = [
  {
    href: `/itemDetails`,
    label: (
      <>
        <FaEye /> View
      </>
    ),
    colorChange: false,
    onClick: false,
  },
  {
    href: "/selling/buildAd/advert",
    label: (
      <>
        <FaPencilAlt /> Edit
      </>
    ),
    colorChange: false,
    onClick: false,
  },
  {
    href: "/selling/buildAd",
    label: (
      <>
        <FaStackExchange /> Optimise
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

export const hullShapes = [
  { id: "Deep V Bottom", name: "Deep V Bottom" },
  { id: "Flat Bottom", name: "Flat Bottom" },
  { id: "Multi Hull", name: "Multi Hull" },
  { id: "Planing", name: "Planing" },
  { id: "Pontoon", name: "Pontoon" },
  { id: "Round Bottom", name: "Round Bottom" },
  { id: "Semi Displacement", name: "Semi Displacement" },
  { id: "Semi Round", name: "Semi Round" },
];

export const hullMaterialArray = [
  { id: "Aluminium", name: "Aluminium" },
  { id: "Composite", name: "Composite" },
  { id: "Ferro-Cement", name: "Ferro-Cement" },
  { id: "Fibreglass", name: "Fibreglass" },
  { id: "Hypalon", name: "Hypalon" },
  { id: "Other", name: "Other" },
  { id: "PVC", name: "PVC" },
  { id: "Roplene", name: "Roplene" },
  { id: "Steel", name: "Steel" },
  { id: "Wood", name: "Wood" },
];

export const keelTypeArray = [
  { id: "Bilge Keel", name: "Bilge Keel" },
  { id: "Bilgeboard", name: "Bilgeboard" },
  { id: "Bruce Foil", name: "Bruce Foil" },
  { id: "Bulb Keel", name: "Bulb Keel" },
  { id: "Canting Keel", name: "Canting Keel" },
  { id: "Centreboard", name: "Centreboard" },
  { id: "Daggerboard", name: "Daggerboard" },
  { id: "False Keel", name: "False Keel" },
  { id: "Fin Keel", name: "Fin Keel" },
  { id: "Full Keel", name: "Full Keel" },
  { id: "Leeboards", name: "Leeboards" },
  { id: "Lifting Keel", name: "Lifting Keel" },
  { id: "Long Keel", name: "Long Keel" },
  { id: "Shoal Keel", name: "Shoal Keel" },
  { id: "Swing Keel", name: "Swing Keel" },
  { id: "Winged Keel", name: "Winged Keel" },
];

export const status = [
  {
    id: "ashore",
    name: "Ashore",
  },
  {
    id: "afloat",
    name: "Afloat",
  },
];

export const colors = [
  { id: "black", name: "Black" },
  { id: "blue", name: "Blue" },
  { id: "red", name: "Red" },
  { id: "yellow", name: "Yellow" },
  { id: "orange", name: "Orange" },
  { id: "grey", name: "Grey" },
  { id: "purple", name: "Purple" },
  { id: "white", name: "White" },
  { id: "cream", name: "Cream" },
  { id: "brown", name: "Brown" },
  { id: "green", name: "Green" },
  { id: "pink", name: "Pink" },
  { id: "silver", name: "Silver" },
  { id: "gold", name: "Gold" },
];

export const serviceHistory = [
  { id: "none", name: "None" },
  { id: "part", name: "Part" },
  { id: "full", name: "Full" },
  { id: "month", name: "Month" },
  { id: "repaired", name: "Repaired" },
];

export const passengers = [
  { id: "passengerOne", name: "Passenger One" },
  { id: "passengerTwo", name: "Passenger Two" },
  { id: "passengerThree", name: "Passenger Three" },
];

export const trailers = [
  { id: "yes", name: "Yes" },
  { id: "no", name: "No" },
  { id: "Sold Separately", name: "Sold Separately" },
];

export const tax = [
  { id: "taxExempt", name: "Tax Exempt" },
  { id: "taxNotPaid", name: "Tax Not Paid" },
  { id: "incVAT", name: "Inc. VAT" },
  { id: "exVAT", name: "Ex. VAT" },
  { id: "noVAT", name: "No VAT" },
];

export const initialFacilities = {
  facilities: {
    Accommodation: false,
    "Licensed Bar": false,
    Restaurant: false,
    "24/7 Support": false,
    "Service Department": false,
    Reception: false,
    Counter: false,
    Parking: false,
    "Disabled Access": false,
    Finance: false,
    "Equipment Hire": false,
    "On Site Transport": false,
    Delivery: false,
    Showroom: false,
    Shop: false,
    Parts: false,
    Dsds: false,
  },
};

export const engineCount = [
  {
    id: 0,
    name: "No Engine",
  },
  {
    id: "Sail Driven",
    name: "Sail Driven",
  },
  {
    id: 1,
    name: "1 Engine",
  },
  {
    id: 2,
    name: "2 Engine",
  },
  {
    id: 3,
    name: "3 Engine",
  },
  {
    id: 4,
    name: "4 Engine",
  },
  {
    id: 5,
    name: "5 Engine",
  },
];

export const propeller = [
  {
    id: 0,
    name: "No Propeller",
  },
  {
    id: 1,
    name: "2 Blade",
  },
  {
    id: 2,
    name: "3 Blade",
  },
  {
    id: 3,
    name: "4 Blade",
  },
  {
    id: 4,
    name: "Folding",
  },
];

export const inquiryTypes = [
  {
    id: 1,
    name: "Advert Listing",
  },
  {
    id: 2,
    name: "Forum",
  },
  {
    id: 3,
    name: "Business Plus+",
  },
  {
    id: 4,
    name: "News and Events",
  },
  {
    id: 5,
    name: "Payments",
  },
  {
    id: 6,
    name: "Account",
  },
  {
    id: 7,
    name: "Report Fraud",
  },
  {
    id: 8,
    name: "Registration",
  },
  {
    id: 9,
    name: "Login",
  },
];

// Trader Seller Fields

export const stepOneFields = [
  "user_name",
  "company_name",
  "building_number",
  "street_name",
  "city",
  "postcode",
  "country",
  "region",
  "phone_no",
  "currency",
  "email",
  "confirmEmail",
  "password",
  "confirmPassword",
];

export const stepTwoFields = [
  "timezone",
  "working_days",
  "open_public_holidays",
  "company_logo",
  "main_picture",
];

export const stepThreeFields = ["first_name", "last_name", "job_title"];

export const privateSellerInitialValues = {
  name: "",
  email: "",
  building_number: "",
  street_name: "",
  city: "",
  postcode: "",
  country: "",
  calling_code: "",
  region: "",
  currency: "",
  phone_no: "",
  timezone: "dasdad",
  password: "",
  sellerType: "private seller",
  image_field: "",
  user_name: "",
};

export const tradeSellerInitialValues = {
  name: "sheran",
  user_name: "",
  company_name: "",
  building_number: "",
  street_name: "",
  city: "",
  postcode: "",
  country: "",
  region: "",
  phone_no: "",
  currency: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  calling_code: "",
  timezone: "",
  open_public_holidays: "",
  company_logo: null,
  main_picture: null,
  first_name: "",
  last_name: "",
  job_title: "",
  working_days: [],
  facilities: [],
  service_hours: [
    { day: "Mon", start_time: "", end_time: "" },
    { day: "Tues", start_time: "", end_time: "" },
    { day: "Wed", start_time: "", end_time: "" },
    { day: "Thurs", start_time: "", end_time: "" },
    { day: "Fri", start_time: "", end_time: "" },
    { day: "Sat", start_time: "", end_time: "" },
    { day: "Sun", start_time: "", end_time: "" },
  ],
};
