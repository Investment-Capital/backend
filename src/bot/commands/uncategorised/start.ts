import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import alreadyCreatedAccount from "../../responces/embeds/alreadyCreatedAccount";
import accountCreatedEmbed from "../../responces/embeds/accountCreated";

export default {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start your investment capital account!"),
  disabled: false,
  requiedPrestige: null,
  requiresAccount: false,
  execute: async (cache, interaction: CommandInteraction) => {
    const user = cache.investors.find(
      (investor) => investor.user.id == interaction.user.id
    );

    if (user) {
      await interaction.deferReply({
        ephemeral: true,
      });

      return await interaction.editReply({
        embeds: [alreadyCreatedAccount(interaction.user)],
      });
    }

    await interaction.deferReply();

    cache.investors.push({
      cash: 1,
      prestige: 1,
      user: {
        id: interaction.user.id,
        displayName: interaction.user.displayName,
        username: interaction.user.username,
        avatar: interaction.user.displayAvatarURL(),
      },
      blacklist: {
        author: null,
        reason: null,
        date: null,
        blacklisted: false,
        history: [],
      },
    });

    await interaction.editReply({
      embeds: [accountCreatedEmbed(interaction.user)],
    });
  },
} satisfies Command;
