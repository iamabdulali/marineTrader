// Function to convert timestamp to desired format
export const convertTimestampToMonthYear = (timestamp) => {
  const date = new Date(timestamp);
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
