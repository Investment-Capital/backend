import Route from "../../../types/route";
import stockConfig from "../../../database/schemas/stockConfig";
import z from "zod";

export default {
  path: "/stocks/edit/:id",
  method: "post",
  authorized: true,
  admin: true,
  schema: {
    name: z.string().optional(),
    icon: z.string().optional(),
    priceChangeRange: z.number().gt(0).optional(),
    maxTaxPercentage: z.number().gte(0).optional(),
    dividendPercentage: z.number().gte(0).optional(),
    defaultOwnershipLimit: z.number().gte(1).optional(),
    prestigeRequirement: z.number().gte(1).optional(),
  },
  execute: async (_, req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const nameData = await stockConfig.findOne({ name });
    if (nameData && nameData.id !== id)
      return res.json({
        error: "Another stock has this name already",
      });

    const data = await stockConfig.updateOne({ id }, req.body);
    if (data.matchedCount == 0)
      return res.json({
        error: "No stock with this ID exists.",
      });

    res.json({ id });
  },
} satisfies Route;
