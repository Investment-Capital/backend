import StockMarket from "../../../classes/stockMarket";
import Route from "../../../types/route";

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

    const data = await StockMarket.history(stock, parseInt(time));

    if (data.length == 0)
      return res.status(404).json({
        error: `No history data is found for stock: ${stock}`,
      });

    res.json(data);
  },
} satisfies Route;
