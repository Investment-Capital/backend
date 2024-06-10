import { Response } from "express";
import Route from "../../../types/route";
import Stocks from "../../../enum/stocks";
import PrestigeUnlocks from "../../../config/prestige/unlocks";
import Volatility from "../../../config/volatility";
import BasePrice from "../../../config/basePrice";
import Income from "../../../config/income";

export default {
  path: "/config/investments",
  execute: (__, _, res: Response) =>
    res.json({
      stocks: Object.values(Stocks).reduce((data: any, stock) => {
        data[stock] = {
          prestigeUnlock: PrestigeUnlocks.stocks[stock],
          volatility: Volatility.stocks[stock],
          basePrice: BasePrice.stocks[stock],
          maxPrice: BasePrice.stocks[stock] * 3,
          income: Income.stocks[stock],
        };

        return data;
      }, {}),
    }),
} satisfies Route;
