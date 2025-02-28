import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import levelInfomationEmbed from "../../../../responces/embeds/levelInfomationEmbed";
import portfolioButton from "../../../../responces/components/buttons/portfolio";
import upgradesViewButton from "../../../../responces/components/buttons/upgrades";

export default {
  validateCommand: (_, interaction) => interaction.isChatInputCommand(),
  execute: async (cache, investor, interaction) => {
    await deferReply(interaction, {
      embeds: [levelInfomationEmbed(interaction.user, investor.xp)],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          portfolioButton(cache),
          upgradesViewButton(cache)
        ),
      ],
    });
  },
} satisfies CommandExecute;
