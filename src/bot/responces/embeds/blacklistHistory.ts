import { EmbedBuilder, User } from "discord.js";
import Blacklist from "../../../types/blacklist";
import addDefaults from "./defaults/addDefaults";
import pageSize from "../../../config/pageSize";
import MarkdownManager from "../../../classes/markdownManager";
import DateFormats from "../../../enum/dateFormats";

const blacklistHistoryEmbed = (user: User, history: Blacklist["history"]) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Blacklist History")
      .addFields(
        history.slice(0, pageSize).map((data) => ({
          name: data.blacklisted ? "Blacklist Added" : "Blacklist Removed",
          value: `Author: ${MarkdownManager.user(
            data.author
          )}\nDate: ${MarkdownManager.date(
            data.date,
            DateFormats.shortDate
          )}\nReason: ${data.reason}`,
          inline: true,
        }))
      )
      .setColor("Blue"),
    user
  );
};

export default blacklistHistoryEmbed;
