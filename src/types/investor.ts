import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;
  user: SavedUser;
  blacklist: {
    blacklisted: boolean;
    reason: string | null;
    date: number | null;
    author: number | null;

    history: Omit<Investor["blacklist"], "history">[];
  };
};

export default Investor;
