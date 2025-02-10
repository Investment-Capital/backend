import {
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

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommand() == "view"
      : interaction.isButton() || interaction.isModalSubmit()
      ? interaction.customId == "realEstateView"
      : false,

  execute: async (
    _,
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
      content: JSON.stringify(realEstate),
    });
  },
} satisfies Command["execute"][number];
