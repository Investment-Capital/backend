import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import portfolioButton from "../../../../responces/components/buttons/portfolio";
import upgradesInfomationEmbed from "../../../../responces/embeds/upgradesInfomation";

export default {
  validateCommand: (_, interaction) => interaction.isChatInputCommand(),
  execute: async (cache, investor, interaction) => {
    await deferReply(interaction, {
      embeds: [upgradesInfomationEmbed(interaction.user, investor)],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          portfolioButton(cache)
        ),
      ],
    });
  },
} satisfies CommandExecute;
