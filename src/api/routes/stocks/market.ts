import StockMarket from "../../../classes/stockMarket";
import stockConfig from "../../../database/schemas/stockConfig";
import Route from "../../../types/route";

export default {
  path: "/stocks/market",
  method: "get",
  execute: async (__, _, res) => {
    const [config, marketData] = await Promise.all([
      stockConfig.find(),
      StockMarket.currentPrices(),
    ]);

    res.json(
      config.map((config) => {
        const { name, prestigeRequirement, icon, defaultOwnershipLimit } =
          config;
        const currentPrice =
          marketData.find((data) => data.stock == name)?.price ?? null;

        return {
          price: currentPrice,
          name,
          icon,
          prestigeRequirement,
          defaultOwnershipLimit,
        };
      })
    );
  },
} satisfies Route;
