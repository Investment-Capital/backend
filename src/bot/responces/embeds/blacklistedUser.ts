import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import MarkdownManager from "../../../classes/markdownManager";

const blacklistedUserEmbed = (
  author: User,
  editedUser: User,
  blacklisted: boolean,
  reason: string
) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(`Blacklist ${blacklisted ? "Added" : "Removed"}`)
      .setColor("Green")
      .addFields(
        {
          name: "User",
          value: MarkdownManager.user(editedUser.id),
          inline: true,
        },
        {
          name: "Reason",
          value: reason,
          inline: true,
        }
      ),
    author
  );
};

export default blacklistedUserEmbed;
