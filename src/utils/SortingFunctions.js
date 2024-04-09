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
