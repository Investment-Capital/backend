import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";
import capitalizeWords from "../../../functions/capitalizeWords";
import getInvestmentConfig from "../../../functions/getInvestmentConfig";
import MarketsType from "../../../types/markets/markets";
import Markets from "../../../enum/markets";

const marketEmbed = (
  user: User,
  market: MarketsType[Markets],
  graph: string
) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(`Market Infomation`)
      .setImage(graph)
      .addFields(
        Object.entries(market).map(([name, data]) => ({
          name:
            getInvestmentConfig(name as any).emoji +
            " " +
            capitalizeWords(name),
          inline: true,
          value: `Price: $${formatNumber(data.price)}`,
        }))
      )
      .setColor("Blue"),

    user
  );
};

export default marketEmbed;
