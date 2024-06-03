type Blacklist = {
  blacklisted: boolean;
  reason: string | null;
  date: number | null;
  author: string | null;

  history: Omit<Blacklist, "history">[];
};

export default Blacklist;
