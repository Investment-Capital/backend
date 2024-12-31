import Stocks from "../enum/stocks";
import Blacklist from "./blacklist";
import Permissions from "./permissions";
import RealEstate from "./realEstate";
import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;
  created: number;
  stocks: {
    [_ in Stocks]: number;
  };
  realEstate: RealEstate[];

  user: SavedUser;
  blacklist: Blacklist;
  permissions: Permissions;

  authorization: string;
};

export default Investor;
