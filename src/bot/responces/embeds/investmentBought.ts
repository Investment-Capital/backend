import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";

const investmentBoughtEmbed = (
  user: User,
  image: string,
  amount: number,
  totalPrice: number,
  incomeGained: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle("Investment Bought")
      .setThumbnail(image)
      .addFields(
        {
          name: "Amount",
          value: formatNumber(amount),
          inline: true,
        },
        {
          name: "Total Price",
          value: "$" + formatNumber(totalPrice),
          inline: true,
        },

        ...(incomeGained > 0
          ? [
              {
                name: "Income Gained",
                value: "$" + formatNumber(incomeGained) + "/hour",
                inline: true,
              },
            ]
          : [])
      ),
    user
  );
};

export default investmentBoughtEmbed;
