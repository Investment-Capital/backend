import Investor from "../types/investor";
import Permissions from "../types/permissions";
import SavedUser from "../types/savedUser";
import stocksConfig from "./stocksConfig";

const defaultInvestorData = (
  user: SavedUser,
  permissions: Permissions,
  authorization: string
): Investor => ({
  user,
  permissions,
  created: Date.now(),
  authorization,
  cash: 1000,
  prestige: 1,
  blacklist: {
    author: null,
    reason: null,
    date: null,
    blacklisted: false,
    history: [],
  },
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
