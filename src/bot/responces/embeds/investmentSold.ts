import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";

const investmentSoldEmbed = (
  user: User,
  image: string,
  amount: number,
  cashGained: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle("Investment Sold")
      .setThumbnail(image)
      .addFields(
        {
          name: "Amount Sold",
          value: formatNumber(amount),
          inline: true,
        },
        {
          name: "Cash Gained",
          value: "$" + formatNumber(cashGained),
          inline: true,
        }
      ),
    user
  );
};

export default investmentSoldEmbed;
