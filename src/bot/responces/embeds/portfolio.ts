import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Investor from "../../../types/investor";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";
import Emojis from "../../../classes/emojis";
import formatNumber from "../../../functions/formatNumber";

const portfolioEmbed = (user: User, investor: Investor, isLookup: boolean) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(`${isLookup ? user.displayName + "'s " : ""}Portfolio`)
      .setColor("Blue")
      .addFields(
        {
          name: "Cash",
          value: Emojis.cash + " $" + formatNumber(investor.cash),
          inline: true,
        },
        {
          name: "Prestige",
          value: Emojis.prestige + " " + investor.prestige,
          inline: true,
        },
        {
          name: "Created Account",
          value:
            Emojis.clock +
            " " +
            MarkdownManager.date(investor.created, DateFormats.relative),
          inline: true,
        }
      ),
    user
  );
};

export default portfolioEmbed;
