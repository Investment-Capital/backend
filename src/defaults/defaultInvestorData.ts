import Roles from "../enum/roles";
import ShopItems from "../enum/shopItems";
import Investor from "../types/investor";
import SavedUser from "../types/savedUser";
import stocksConfig from "../config/stocksConfig";
import upgradesConfig from "../config/upgradesConfig";

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
  shop: Object.values(ShopItems).reduce((prev: any, item) => {
    prev[item] = 0;
    return prev;
  }, {}),
  cooldowns: {
    commandXp: Date.now(),
  },
});

export default defaultInvestorData;
