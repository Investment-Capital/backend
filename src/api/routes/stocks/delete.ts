import Route from "../../../types/route";
import stockConfig from "../../../database/schemas/stockConfig";

export default {
  path: "/stocks/delete/:id",
  method: "post",
  authorized: true,
  admin: true,
  execute: async (_, req, res) => {
    const { id } = req.params;
    const data = await stockConfig.deleteOne({ id });

    if (data.deletedCount == 0)
      return res.json({
        error: "No stock with this ID exists.",
      });

    res.json({ id });
  },
} satisfies Route;
