import stockMarketHistory from "../../../database/schemas/stockMarketHistory";
import Route from "../../../types/route";

export default {
  path: "/stocks/market",
  method: "get",
  execute: async (__, _, res) => {
    // will also return stockConfig data (icons) soon
    const data = await stockMarketHistory.aggregate([
      { $sort: { stock: 1, date: -1 } },
      {
        $group: {
          _id: "$stock",
          stock: { $first: "$stock" },
          price: { $first: "$price" },
          date: { $first: "$date" },
        },
      },
      { $project: { date: 1, price: 1, stock: 1, _id: 0 } },
    ]);

    res.json(data);
  },
} satisfies Route;
