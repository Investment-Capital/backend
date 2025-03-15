import deferReply from "../../../../../functions/deferReply";
import prestigeViewEmbed from "../../../../responces/embeds/prestigeView";
import CommandExecute from "../../../../../types/commandExecute";
import prestigeConfig from "../../../../../config/prestigeConfig";
import errorEmbed from "../../../../responces/embeds/error";

export default {
  validateCommand: (_, interaction) => interaction.isChatInputCommand(),
  execute: async (_, investor, interaction) => {
    if (!prestigeConfig[investor.prestige + 1])
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You have reached the final prestige.",
              "Finished Prestiges"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    await deferReply(interaction, {
      embeds: [prestigeViewEmbed(interaction.user, investor.prestige)],
    });
  },
} satisfies CommandExecute;
