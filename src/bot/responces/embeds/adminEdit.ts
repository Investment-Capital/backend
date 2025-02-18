import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Roles from "../../../enum/roles";
import MarkdownManager from "../../../classes/markdownManager";
import capitalizeWords from "../../../functions/capitalizeWords";

const adminEditEmbed = (
  author: User,
  editedUser: User,
  newRole: Roles.admin | Roles.player
) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Green")
      .setTitle(newRole == Roles.admin ? "Admin Given" : "Admin Removed")
      .addFields(
        {
          name: "User",
          value: MarkdownManager.user(editedUser.id),
          inline: true,
        },
        {
          name: "New Role",
          value: capitalizeWords(newRole),
          inline: true,
        }
      ),
    author
  );
};

export default adminEditEmbed;
