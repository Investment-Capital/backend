import z from "zod";
import Route from "../../../types/route";
import stockConfig from "../../../database/schemas/stockConfig";
import StockMarket from "../../../classes/stockMarket";
import investors from "../../../database/schemas/investors";
import Stocks from "../../../classes/stocks";

export default {
  authorized: true,
  method: "post",
  path: "/stocks/buy",
  schema: {
    amount: z.number(),
    stock: z.string(),
  },
  execute: async (_, req, res, investor) => {
    const { stock, amount } = req.body;

    const [config, price] = await Promise.all([
      stockConfig.findOne({
        name: stock,
      }),
      StockMarket.price(stock),
    ]);

    if (!config || !price)
      return res.json({
        error: "No infomation about this stock.",
      });

    const cost = price * amount;
    const ownershipLimit = Stocks.ownershipLimit(config);

    if (investor.cash < cost)
      return res.json({
        error: "You don't have enough cash for this",
      });

    if (investor.stocks.get(stock) + amount > ownershipLimit)
      return res.json({
        error: `You can only own ${ownershipLimit} of this stock`,
      });

    await investors.updateOne(
      {
        "account.profile.id": investor.account.profile.id,
      },
      {
        $inc: {
          [`stocks.${stock}`]: amount,
          cash: -cost,
        },
      }
    );

    res.json({
      cost,
    });
  },
} satisfies Route;
