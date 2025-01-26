import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../../types/command";
import alreadyCreatedAccountEmbed from "../../responces/embeds/alreadyCreatedAccount";
import accountCreatedEmbed from "../../responces/embeds/accountCreated";
import createAccount from "../../../functions/createAccount";
import deferReply from "../../../functions/deferReply";
import Cache from "../../../types/cache";
import portfolioButton from "../../responces/components/buttons/portfolio";

export default {
  requiresAccount: false,
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start your investment capital account!")
    .toJSON(),
  validateComponent: (interaction) => interaction.customId == "start",
  execute: async (cache: Cache, interaction: CommandInteraction) => {
    const investor = cache.investors.find(
      (investor) => investor.user.id == interaction.user.id
    );

    if (investor)
      return await deferReply(
        interaction,
        { embeds: [alreadyCreatedAccountEmbed(interaction.user)] },
        {
          ephemeral: true,
        }
      );

    createAccount(cache, {
      avatar: interaction.user.displayAvatarURL(),
      username: interaction.user.username,
      displayName: interaction.user.displayName,
      id: interaction.user.id,
    });

    await deferReply(interaction, {
      embeds: [
        accountCreatedEmbed(
          interaction.user,
          cache.client.application?.commands.cache.toJSON() ?? []
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(portfolioButton),
      ],
    });
  },
} satisfies Command;
