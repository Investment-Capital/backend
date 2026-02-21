import Route from "../../../types/route";
import levelConfig from "../../../database/schemas/levelConfig";
import create from "./create";

export default {
  path: "/levels/edit/:level",
  method: "post",
  authorized: true,
  admin: true,
  schema: Object.entries(create.schema).reduce(
    (all: Record<string, any>, [key, schema]) => {
      all[key] = schema.optional();
      return all;
    },
    {},
  ),
  execute: async (_, req, res) => {
    const { level } = req.params;

    const update = await levelConfig.updateOne(
      {
        level: parseInt(level),
      },
      req.body,
    );

    if (update.matchedCount == 0)
      return res.json({
        error: `Level ${level} doesn't exist`,
      });

    res.json({
      success: `updated level ${level}`,
    });
  },
} satisfies Route;
