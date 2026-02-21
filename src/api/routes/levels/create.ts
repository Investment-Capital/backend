import z from "zod";
import Route from "../../../types/route";
import levelConfig from "../../../database/schemas/levelConfig";

export default {
  path: "/levels/create",
  method: "post",
  authorized: true,
  admin: true,
  schema: {
    xpRequired: z.int().gte(1),
    rewards: z.object({
      cash: z.number().gte(0).optional(),
      stocks: z.record(z.string(), z.number().gt(0)).optional(),
    }),
  },
  execute: async (_, req, res) => {
    const highestLevel =
      (
        await levelConfig.findOne().sort({
          level: -1,
        })
      )?.level ?? 0;

    await new levelConfig({
      level: highestLevel + 1,
      ...req.body,
    }).save();

    res.json({
      success: `Added level ${highestLevel + 1}`,
    });
  },
} satisfies Route;
