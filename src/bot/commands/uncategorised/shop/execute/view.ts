import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import shopViewEmbed from "../../../../responces/embeds/shopView";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand() &&
    interaction.options.getSubcommand() == "view",
  execute: async (_, investor, interaction) => {
    await deferReply(interaction, {
      embeds: [shopViewEmbed(interaction.user, investor)],
    });
  },
} satisfies CommandExecute;
