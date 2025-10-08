import StockMarket from "../../../classes/stockMarket";
import Route from "../../../types/route";

export default {
  path: "/stocks/market",
  method: "get",
  execute: async (__, _, res) => {
    const data = await StockMarket.prices();

    if (data.length == 0)
      return res.status(404).json({
        error: "No stock history data is found",
      });

    res.json(data);
  },
} satisfies Route;
