import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Investor from "../../../types/investor";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";

const portfolioEmbed = (user: User, investor: Investor) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Portfolio")
      .setColor("Blue")
      .addFields(
        {
          name: "Cash",
          value: investor.cash.toLocaleString(),
        },
        {
          name: "Created Account",
          value: MarkdownManager.date(investor.created, DateFormats.relative),
        }
      ),
    user
  );
};

export default portfolioEmbed;
