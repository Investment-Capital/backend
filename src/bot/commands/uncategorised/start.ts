import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import alreadyCreatedAccount from "../../responces/embeds/alreadyCreatedAccount";
import accountCreatedEmbed from "../../responces/embeds/accountCreated";
import createAccount from "../../../functions/createAccount";

export default {
  requiresAccount: false,
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start your investment capital account!"),
  execute: async (cache, interaction: CommandInteraction) => {
    const investor = cache.investors.find(
      (investor) => investor.user.id == interaction.user.id
    );

    if (investor) {
      await interaction.deferReply({
        ephemeral: true,
      });

      return await interaction.editReply({
        embeds: [alreadyCreatedAccount(interaction.user)],
      });
    }

    await interaction.deferReply();

    createAccount(cache, interaction.user);

    await interaction.editReply({
      embeds: [accountCreatedEmbed(interaction.user)],
    });
  },
} satisfies Command;
