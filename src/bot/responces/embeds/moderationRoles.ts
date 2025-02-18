import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Investor from "../../../types/investor";
import rolesConfig from "../../../config/rolesConfig";
import capitalizeWords from "../../../functions/capitalizeWords";
import MarkdownManager from "../../../classes/markdownManager";

const moderationRolesEmbed = (user: User, investors: Investor[]) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(`Moderation Roles`)
      .addFields(
        Object.entries(rolesConfig)
          .filter(([_, config]) => config.moderation)
          .map(([role, config]) => ({
            name: config.emoji + " " + capitalizeWords(role) + "s",
            value: (() => {
              const data = investors
                .filter((investor) => investor.role == role)
                .map((investor) => MarkdownManager.user(investor.user.id));

              if (data.length == 0) return "No investors with this role.";
              return data.join(", ");
            })(),
            inline: true,
          }))
      )
      .setColor("Blue"),
    user
  );
};

export default moderationRolesEmbed;
