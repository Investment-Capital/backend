import z from "zod";
import Route from "../../../types/route";
import StockMarket from "../../../classes/stockMarket";
import stockConfig from "../../../database/schemas/stockConfig";
import Stock from "../../../classes/stock";
import investors from "../../../database/schemas/investors";

export default {
  path: "/stocks/sell",
  schema: {
    id: z.string(),
    amount: z.number(),
  },
  authorized: true,
  method: "post",
  execute: async (_, req, res, investor) => {
    const { id, amount } = req.body;

    if ((investor.stocks.get(id) ?? 0) < amount)
      return res.json({
        error: `You don't have ${amount} of this stock`,
      });

    const [config, price] = await Promise.all([
      stockConfig.findOne({
        id,
      }),
      StockMarket.price(id),
    ]);

    if (!price || !config)
      return res.json({
        error: "No stock data found",
      });

    const salesPrice = Stock.salesPrice(
      price,
      amount,
      investor.stocks.get(id) ?? 0,
      config
    );

    await investors.updateOne(
      {
        "account.profile.id": investor.account.profile.id,
      },
      {
        $inc: {
          cash: salesPrice,
          [`stocks.${id}`]: -amount,
        },
      }
    );

    res.json({ salesPrice });
  },
} satisfies Route;
