import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import portfolioButton from "../../../../responces/components/buttons/portfolio";
import upgradesInfomationEmbed from "../../../../responces/embeds/upgradesInfomation";
import CustomIdManager from "../../../../../classes/customIdManager";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand()
      ? true
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).id == "upgradesView"
      : false,
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
