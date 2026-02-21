import Route from "../../../types/route";
import levelConfig from "../../../database/schemas/levelConfig";
import create from "./create";
import z from "zod";

export default {
  path: "/levels/edit",
  method: "post",
  authorized: true,
  admin: true,
  schema: Object.entries(create.schema).reduce(
    (all: Record<string, any>, [key, schema]) => {
      all[key] = schema.optional();
      return all;
    },
    {
      level: z.int().gte(1),
    },
  ),
  execute: async (_, req, res) => {
    const update = await levelConfig.updateOne(
      {
        level: req.body.level,
      },
      req.body,
    );

    if (update.matchedCount == 0)
      return res.json({
        error: `Level ${req.body.level} doesn't exist`,
      });

    res.json({
      success: "updated level",
    });
  },
} satisfies Route;
