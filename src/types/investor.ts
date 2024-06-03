import Blacklist from "./blacklist";
import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;

  user: SavedUser;
  blacklist: Blacklist;
};

export default Investor;
