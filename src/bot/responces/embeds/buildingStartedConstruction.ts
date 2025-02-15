import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";
import formatNumber from "../../../functions/formatNumber";

const buildingStartedConstructionEmbed = (
  user: User,
  image: string,
  name: string,
  completed: number,
  price: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle("Construction Started")
      .setThumbnail(image)
      .addFields(
        {
          name: "Name",
          value: name,
          inline: true,
        },
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

export default buildingStartedConstructionEmbed;
