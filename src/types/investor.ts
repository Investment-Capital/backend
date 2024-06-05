import Blacklist from "./blacklist";
import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;
  created: number;

  user: SavedUser;
  blacklist: Blacklist;

  authorization: string;
};

export default Investor;
