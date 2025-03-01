import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import realEstateModal from "../../../../responces/modals/realEstate";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import realEstateViewEmbed from "../../../../responces/embeds/realEstateView";
import realEstateUpgradesButtons from "../../../../responces/components/buttons/realEstateUpgrades";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";
import CustomIdManager from "../../../../../classes/customIdManager";
import searchItems from "../../../../../functions/searchItems";
import realEstateConfig from "../../../../../config/realEstateConfig";
import CommandExecute from "../../../../../types/commandExecute";
import realEstateSellButton from "../../../../responces/components/buttons/realEstateSell";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand() || interaction.isAutocomplete()
      ? interaction.options.getSubcommand() == "view"
      : interaction.isButton() || interaction.isModalSubmit()
      ? CustomIdManager.parse(cache, interaction.customId).id ==
        "realEstateView"
      : false,

  autocomplete: async (_, investor, interaction) =>
    await interaction.respond(
      searchItems(
        interaction.options.getFocused(),
        investor.realEstate,
        (realEstate) => realEstate.name
      ).map((realEstate) => ({
        name: realEstateConfig[realEstate.type].emoji + " " + realEstate.name,
        value: realEstate.name,
      }))
    ),

  execute: async (cache, investor, interaction) => {
    if (
      !interaction.isButton() &&
      !interaction.isModalSubmit() &&
      !interaction.isChatInputCommand()
    )
      return;

    if (interaction.isButton())
      return await interaction.showModal(
        realEstateModal(cache, { id: "realEstateView" })
      );

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
        realEstateViewEmbed(
          interaction.user,
          investor.prestige,
          realEstate,
          cache.markets
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateUpgradesButtons(cache, investor, realEstate)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateViewButton(cache),
          realEstateSellButton(cache, interaction.user, realEstate)
        ),
      ],
    });
  },
} satisfies CommandExecute;
