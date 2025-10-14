import z from "zod";
import Route from "../../../types/route";
import StockConfig from "../../../types/stockConfig";
import stockConfig from "../../../database/schemas/stockConfig";
import { randomUUID } from "crypto";
import stockMarketHistory from "../../../database/schemas/stockMarketHistory";

export default {
  path: "/stocks/create",
  method: "post",
  authorized: true,
  admin: true,
  schema: {
    name: z.string(),
    icon: z.string(),
    priceChangeRange: z.number().gt(0),
    maxTaxPercentage: z.number().gte(0),
    dividendPercentage: z.number().gte(0),
    defaultOwnershipLimit: z.number().gte(1),
    prestigeRequirement: z.number().gte(1),

    startingPrice: z.number().gt(0),
  },
  execute: async (_, req, res) => {
    const { name, startingPrice } = req.body;
    const nameData = await stockConfig.findOne({ name });

    if (nameData)
      return res.json({
        error:
          "A stock with this name already exists, don't use the same name for 2 stocks.",
      });

    delete req.body.startingPrice;
    const data: StockConfig = {
      id: randomUUID(),
      ...req.body,
    };

    await Promise.all([
      new stockConfig(data).save(),
      new stockMarketHistory({
        id: data.id,
        price: startingPrice,
        date: Date.now(),
      }).save(),
    ]);

    res.json(data);
  },
} satisfies Route;
