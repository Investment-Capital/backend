import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import Command from "../../../../../types/command";
import Investor from "../../../../../types/investor";
import realEstateModal from "../../../../responces/modals/realEstate";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import realEstateViewEmbed from "../../../../responces/embeds/realEstateView";
import Cache from "../../../../../types/cache";
import realEstateUpgradesButtons from "../../../../responces/components/buttons/realEstateUpgrades";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "view"
      : interaction.isButton() || interaction.isModalSubmit()
      ? interaction.customId == "realEstateView"
      : false,

  execute: async (
    cache: Cache,
    investor: Investor,
    interaction:
      | ButtonInteraction
      | ModalSubmitInteraction
      | ChatInputCommandInteraction
  ) => {
    if (interaction.isButton())
      return await interaction.showModal(realEstateModal("realEstateView"));

    const name = interaction.isChatInputCommand()
      ? interaction.options.getString("name", true)
      : interaction.fields.getTextInputValue("name");

    const realEstate = investor.realEstate.find(
      (realEstate) => realEstate.name == name
    );

    if (!realEstate)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have this real estate.",
              "Invalid Investment"
            ),
          ],
        },
        { ephemeral: true }
      );

    return await deferReply(interaction, {
      embeds: [
        realEstateViewEmbed(interaction.user, realEstate, cache.markets),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateUpgradesButtons(interaction.user, realEstate)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateViewButton()
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
