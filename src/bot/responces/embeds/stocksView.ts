import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Investor from "../../../types/investor";
import stocksConfig from "../../../config/stocksConfig";
import capitalizeWords from "../../../functions/capitalizeWords";
import Emojis from "../../../classes/emojis";
import Stocks from "../../../enum/stocks";
import formatNumber from "../../../functions/formatNumber";
import Markets from "../../../types/markets/markets";

const stocksViewEmbed = (
  user: User,
  investor: Investor,
  stockMarket: Markets["stocks"]
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Owned Stocks")
      .addFields(
        Object.values(Stocks).map((name) => {
          const config = stocksConfig[name];

          return {
            name: config.emoji + " " + capitalizeWords(name),
            inline: true,
            value:
              config.requiredPrestige > investor.prestige
                ? `${Emojis.lock} Unlocked at prestige ${config.requiredPrestige}.`
                : `Owned: ${formatNumber(
                    investor.stocks[name]
                  )}\nTotal Value: $${formatNumber(
                    investor.stocks[name] * stockMarket[name].price
                  )}`,
          };
        })
      ),
    user
  );
};

export default stocksViewEmbed;
