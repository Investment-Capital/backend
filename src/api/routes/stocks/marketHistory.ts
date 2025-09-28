import stockMarketHistory from "../../../database/schemas/stockMarketHistory";
import Route from "../../../types/route";
import { config } from "dotenv";
config();

const MAX_HISTORY_LENGTH = parseInt(process.env.MAX_HISTORY_LENGTH as string);

export default {
  path: "/stocks/market/:stock",
  method: "get",
  execute: async (_, req, res) => {
    const { time } = req.query;
    const { stock } = req.params;

    if (!time || typeof time !== "string")
      return res.status(404).json({
        error: "No `time` query param provided ",
      });

    const data = await stockMarketHistory.aggregate([
      { $match: { date: { $gte: Date.now() - parseInt(time) }, stock } },
      { $sort: { date: 1 } },
      {
        $setWindowFields: {
          sortBy: { date: 1 },
          output: {
            idx: { $documentNumber: {} },
            total: { $count: {} },
          },
        },
      },
      {
        $addFields: {
          scaled: {
            $floor: {
              $divide: [{ $multiply: ["$idx", MAX_HISTORY_LENGTH] }, "$total"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$scaled",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $project: { date: 1, price: 1, _id: 0 } },
    ]);

    if (data.length == 0)
      return res.status(404).json({
        error: "No data found",
      });

    res.json(data);
  },
} satisfies Route;
