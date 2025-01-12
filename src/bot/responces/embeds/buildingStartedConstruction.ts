import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";
import formatNumber from "../../../functions/formatNumber";

const buildingStartedConstruction = (
  user: User,
  image: string,
  completed: number,
  price: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle("Construction Started")
      .setThumbnail(image)
      .addFields(
        {
          name: "Completed",
          value: MarkdownManager.date(completed, DateFormats.relative),
          inline: true,
        },
        {
          name: "Price",
          value: "$" + formatNumber(price),
          inline: true,
        }
      ),
    user
  );
};

export default buildingStartedConstruction;
