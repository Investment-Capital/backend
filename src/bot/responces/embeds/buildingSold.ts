import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import formatNumber from "../../../functions/formatNumber";

const buildingSold = (
  user: User,
  image: string,
  name: string,
  type: string,
  cashGained: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle("Building Sold")
      .setThumbnail(image)
      .addFields(
        {
          name: "Building Name",
          value: name,
          inline: true,
        },
        { name: "Building Type", value: type, inline: true },
        {
          name: "Cash Gained",
          value: "$" + formatNumber(cashGained),
          inline: true,
        }
      ),
    user
  );
};

export default buildingSold;
