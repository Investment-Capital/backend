import { ActionRowBuilder, ButtonBuilder, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import createAccount from "../../../../../functions/createAccount";
import accountCreatedEmbed from "../../../../responces/embeds/accountCreated";
import portfolioButton from "../../../../responces/components/buttons/portfolio";
import CustomIdManager from "../../../../../classes/customIdManager";

export default {
  validateCommand: (cache: Cache, interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? true
      : interaction.isButton() &&
        CustomIdManager.parse(cache, interaction.customId).id == "start",
  execute: async (cache: Cache, interaction: Interaction) => {
    const investor = cache.investors.find(
      (investor) => investor.user.id == interaction.user.id
    );

    if (investor)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You've already made an investment capital account.",
              "Account Already Created"
            ),
          ],
        },
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
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          portfolioButton(cache)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
