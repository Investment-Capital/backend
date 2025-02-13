import pageSize from "../config/pageSize";

const searchItems = <T>(
  search: string,
  items: T[],
  getValue: (data: T) => string
) => {
  return items
    .filter((item) =>
      getValue(item).toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, pageSize - 1);
};

export default searchItems;
