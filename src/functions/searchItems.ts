const searchItems = (search: string, items: string[], limit: number = 25) => {
  return items
    .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    .slice(0, limit - 1);
};

export default searchItems;
