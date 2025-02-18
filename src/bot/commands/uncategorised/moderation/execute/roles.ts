import CustomIdManager from "../../../../../classes/customIdManager";
import deferReply from "../../../../../functions/deferReply";
import Cache from "../../../../../types/cache";
import CommandExecute from "../../../../../types/commandExecute";
import moderationRolesEmbed from "../../../../responces/embeds/moderationRoles";

export default {
  requiresAccount: false,
  bypassBlacklist: true,
  validateCommand: (cache: Cache, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "roles" &&
        !interaction.options.getSubcommandGroup()
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).id ==
        "moderationRoles"
      : false,
  execute: async (cache, interaction) =>
    await deferReply(interaction, {
      embeds: [moderationRolesEmbed(interaction.user, cache.investors)],
    }),
} satisfies CommandExecute;
