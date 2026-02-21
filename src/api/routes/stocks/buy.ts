import z from "zod";
import Route from "../../../types/route";
import stockConfigSchema from "../../../database/schemas/stockConfig";
import StockMarket from "../../../classes/stockMarket";
import investors from "../../../database/schemas/investors";
import Stock from "../../../classes/stock";
import levelConfigSchema from "../../../database/schemas/levelConfig";
import Investor from "../../../classes/investor";

export default {
  authorized: true,
  method: "post",
  path: "/stocks/buy",
  schema: {
    amount: z.int().gte(1),
    id: z.string(),
  },
  execute: async (_, req, res, investor) => {
    const { id, amount } = req.body;

    const [stockConfig, levelConfigs, price] = await Promise.all([
      stockConfigSchema.findOne({
        id,
      }),
      levelConfigSchema.find(),
      StockMarket.price(id),
    ]);

    if (!stockConfig || !price)
      return res.json({
        error: "No infomation about this stock.",
      });

    const cost = price * amount;
    const ownershipLimit = Stock.ownershipLimit(stockConfig);
    const level = Investor.level(investor.xp, levelConfigs);

    if (stockConfig.prestigeRequirement > investor.prestige)
      return res.json({
        error: `You need to be prestige ${stockConfig.prestigeRequirement} to buy this stock`,
      });

    if (stockConfig.levelRequirement > level)
      return res.json({
        error: `You need to be level ${stockConfig.levelRequirement} to buy this stock`,
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
      },
    );

    res.json({
      cost,
    });
  },
} satisfies Route;
