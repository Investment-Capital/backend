import stocksConfig from "../../../../config/stocksConfig";
import Stocks from "../../../../enum/stocks";
import Command from "../../../../types/command";

export default {
  requiedPrestige: {
    commands: Object.values(Stocks).flatMap((stock) => {
      const config = stocksConfig[stock];

      return ["buy", "sell"].map((subcommandGroup) => ({
        requiredPrestige: config.requiredPrestige,
        subcommand: stock,
        subcommandGroup: subcommandGroup,
      }));
    }),
    default: Math.min(
      ...Object.values(stocksConfig).map((config) => config.requiredPrestige)
    ),
  },
} satisfies Command["config"];
