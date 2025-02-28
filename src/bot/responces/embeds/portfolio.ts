import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Investor from "../../../types/investor";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";
import Emojis from "../../../classes/emojis";
import formatNumber from "../../../functions/formatNumber";
import getInvestorIncome from "../../../functions/getInvestorIncome";
import capitalizeWords from "../../../functions/capitalizeWords";
import rolesConfig from "../../../config/rolesConfig";
import getInvestorLevel from "../../../functions/getInvestorLevel";

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
          name: "Income",
          value:
            Emojis.moneyBag +
            " $" +
            formatNumber(getInvestorIncome(investor)) +
            "/hour",
          inline: true,
        },
        {
          name: "Level",
          value: Emojis.xp + " " + getInvestorLevel(investor.xp),
          inline: true,
        },
        {
          name: "Role",
          value:
            rolesConfig[investor.role].emoji +
            " " +
            capitalizeWords(investor.role),
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
