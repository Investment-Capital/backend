import Blacklist from "./blacklist";
import Permissions from "./permissions";
import SavedUser from "./savedUser";

type Investor = {
  cash: number;
  prestige: number;
  created: number;

  user: SavedUser;
  blacklist: Blacklist;
  permissions: Permissions;

  authorization: string;
};

export default Investor;
