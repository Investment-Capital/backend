import StockMarket from "../../../classes/stockMarket";
import Route from "../../../types/route";

export default {
  path: "/stocks/market/:id",
  method: "get",
  execute: async (_, req, res) => {
    const { time } = req.query;
    const { id } = req.params;

    if (!time || typeof time !== "string")
      return res.status(404).json({
        error: "No `time` query param provided ",
      });

    const data = await StockMarket.history(id, parseInt(time));

    if (data.length == 0)
      return res.status(404).json({
        error: `No history data is found for stock id: ${id} in this time frame`,
      });

    res.json(data);
  },
} satisfies Route;
