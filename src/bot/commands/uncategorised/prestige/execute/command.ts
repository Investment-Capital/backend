import deferReply from "../../../../../functions/deferReply";
import prestigeViewEmbed from "../../../../responces/embeds/prestigeView";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (_, interaction) => interaction.isChatInputCommand(),
  execute: async (_, investor, interaction) => {
    await deferReply(interaction, {
      embeds: [prestigeViewEmbed(interaction.user, investor.prestige)],
    });
  },
} satisfies CommandExecute;
