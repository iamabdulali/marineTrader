export const handleSortByPrice = (ascending, items, setData) => {
  const sortedAdverts = [...items];
  sortedAdverts.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
  setData(sortedAdverts);
};

export const handleSortByDate = (ascending, items, setData, e) => {
  const sortedAdverts = [...items];
  sortedAdverts.sort((a, b) => {
    return ascending
      ? new Date(a.created_at) - new Date(b.created_at)
      : new Date(b.created_at) - new Date(a.created_at);
  });
  setData(sortedAdverts);
};

export const filterOfferByStatus = (selectedStatus, items, setData) => {
  if (selectedStatus === "show all") {
    setData(items); // Set data to the original array when "show all" is selected
    return;
  }
  const filteredAdverts = items.filter((item) => item.status == selectedStatus);
  console.log(filteredAdverts);
  setData(filteredAdverts);
};

export const filterSellingByStatus = (selectedStatus, items, setData) => {
  if (selectedStatus === "show all") {
    setData(items); // Set data to the original array when "show all" is selected
    return;
  }
  console.log(selectedStatus);
  const filteredAdverts = items.filter(
    (item) => item.advert_status == selectedStatus
  );
  console.log(filteredAdverts);
  setData(filteredAdverts);
};
