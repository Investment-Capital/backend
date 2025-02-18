import { ButtonBuilder, ButtonStyle } from "discord.js";
import Cache from "../../../../types/cache";
import CustomIdManager from "../../../../classes/customIdManager";
import Emojis from "../../../../classes/emojis";

const moderationRolesButton = (cache: Cache) => {
  return new ButtonBuilder()
    .setCustomId(
      CustomIdManager.create(cache, {
        id: "moderationRoles",
      })
    )
    .setEmoji(Emojis.detective)
    .setStyle(ButtonStyle.Secondary)
    .setLabel("Moderation Roles");
};

export default moderationRolesButton;
