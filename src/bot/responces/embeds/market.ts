import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";
import capitalizeWords from "../../../functions/capitalizeWords";
import getInvestmentConfig from "../../../functions/getInvestmentConfig";
import MarketsType from "../../../types/markets/markets";
import Markets from "../../../enum/markets";

const marketEmbed = (
  user: User,
  image: string,
  marketData: MarketsType[Markets],
  graph: string
) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(`Market Infomation`)
      .setImage(graph)
      .setThumbnail(image)
      .addFields(
        Object.entries(marketData).map(([name, data]) => ({
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
