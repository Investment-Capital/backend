import Route from "../../../types/route";
import stockConfig from "../../../database/schemas/stockConfig";
import create from "./create";

export default {
  path: "/stocks/edit/:id",
  method: "post",
  authorized: true,
  admin: true,
  schema: Object.entries(create.schema).reduce(
    (all: Record<string, any>, [key, schema]) => {
      if (key !== "startingPrice") all[key] = schema.optional();
      return all;
    },
    {},
  ),
  execute: async (_, req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (name) {
      const nameData = await stockConfig.findOne({ name });
      if (nameData && nameData.id !== id)
        return res.json({
          error:
            "Another stock has this name already, pick a different name to change to",
        });
    }

    const update = await stockConfig.updateOne({ id }, req.body);
    if (update.matchedCount == 0)
      return res.json({
        error: "No stock with this ID exists.",
      });

    res.json({ id });
  },
} satisfies Route;
