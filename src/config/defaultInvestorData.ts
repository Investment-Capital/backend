import Roles from "../enum/roles";
import Investor from "../types/investor";
import SavedUser from "../types/savedUser";
import stocksConfig from "./stocksConfig";
import upgradesConfig from "./upgradesConfig";

const defaultInvestorData = (
  user: SavedUser,
  role: Roles,
  authorization: string
): Investor => ({
  user,
  role,
  created: Date.now(),
  authorization,
  cash: upgradesConfig.startingCash.default,
  prestige: 1,
  blacklist: {
    author: null,
    reason: null,
    date: null,
    blacklisted: false,
    history: [],
  },
  xp: 0,
  realEstate: [],
  stocks: Object.entries(stocksConfig).reduce(
    (object: any, [stock, { requiredPrestige }]) => {
      object[stock] = requiredPrestige == 1 ? Math.ceil(Math.random() * 8) : 0;

      return object;
    },
    {}
  ),
});

export default defaultInvestorData;
