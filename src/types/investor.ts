import Roles from "../enum/roles";
import Stocks from "../enum/stocks";
import Blacklist from "./blacklist";
import RealEstate from "./realEstate";
import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;
  created: number;
  xp: number;
  realEstate: RealEstate[];
  user: SavedUser;
  blacklist: Blacklist;
  role: Roles;
  authorization: string;

  stocks: {
    [_ in Stocks]: number;
  };
  cooldowns: {
    commandXp: number;
  };
};

export default Investor;
