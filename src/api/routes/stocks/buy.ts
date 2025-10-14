import z from "zod";
import Route from "../../../types/route";
import stockConfig from "../../../database/schemas/stockConfig";
import StockMarket from "../../../classes/stockMarket";
import investors from "../../../database/schemas/investors";
import Stock from "../../../classes/stock";

export default {
  authorized: true,
  method: "post",
  path: "/stocks/buy",
  schema: {
    amount: z.number(),
    id: z.string(),
  },
  execute: async (_, req, res, investor) => {
    const { id, amount } = req.body;

    const [config, price] = await Promise.all([
      stockConfig.findOne({
        id,
      }),
      StockMarket.price(id),
    ]);

    if (!config || !price)
      return res.json({
        error: "No infomation about this stock.",
      });

    const cost = price * amount;
    const ownershipLimit = Stock.ownershipLimit(config);

    if (config.prestigeRequirement > investor.prestige)
      return res.json({
        error: `You need to be prestige ${config.prestigeRequirement} to buy this stock`,
      });

    if (investor.cash < cost)
      return res.json({
        error: "You don't have enough cash for this",
      });

    if (investor.stocks.get(id) + amount > ownershipLimit)
      return res.json({
        error: `You can only own ${ownershipLimit} of this stock`,
      });

    await investors.updateOne(
      {
        "account.profile.id": investor.account.profile.id,
      },
      {
        $inc: {
          [`stocks.${id}`]: amount,
          cash: -cost,
        },
      }
    );

    res.json({
      cost,
    });
  },
} satisfies Route;
