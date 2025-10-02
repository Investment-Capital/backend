import z from "zod";
import Route from "../../../types/route";
import StockConfig from "../../../types/stockConfig";
import stockConfig from "../../../database/schemas/stockConfig";

export default {
  path: "/stocks/config/:stock",
  method: "post",
  authorized: true,
  admin: true,
  schema: {
    icon: z.string(),
    priceChangeRange: z.number().gt(0),
    maxTaxPercentage: z.number().gte(0),
    dividendPercentage: z.number().gte(0),
    defaultPrice: z.number().gt(0),
    defaultOwnershipLimit: z.number().gte(1),
    prestigeRequirement: z.number().gte(1),
  },
  execute: async (_, req, res) => {
    const { stock } = req.params;

    const data: StockConfig = {
      name: stock,
      ...req.body,
    };

    await stockConfig.updateOne(
      { name: stock },
      { $set: data },
      { upsert: true }
    );

    res.json(data);
  },
} satisfies Route;
