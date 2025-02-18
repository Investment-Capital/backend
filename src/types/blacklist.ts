type Blacklist = {
  blacklisted: boolean;
  reason: string | null;
  date: number | null;
  author: string | null;

  history: {
    blacklisted: boolean;
    reason: string;
    date: number;
    author: string;
  }[];
};

export default Blacklist;
