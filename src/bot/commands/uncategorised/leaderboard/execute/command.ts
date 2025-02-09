import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import LeaderboardTypes from "../../../../../enum/leaderboardTypes";
import leaderboardModal from "../../../../responces/modals/leaderboard";
import leaderboardsConfig from "../../../../../config/leaderboardsConfig";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import getLeaderboardData from "../../../../../functions/getLeaderboardData";
import leaderboardEmbed from "../../../../responces/embeds/leaderboard";
import leaderboardButtons from "../../../../responces/components/buttons/leaderboard";
import leaderboardMenu from "../../../../responces/components/menus/leaderboard";
import pageSize from "../../../../../config/pageSize";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand() ||
    interaction.isContextMenuCommand() ||
    interaction.isAutocomplete()
      ? true
      : interaction.customId.startsWith("leaderboard"),

  execute: async (
    cache: Cache,
    interaction:
      | ButtonInteraction
      | ChatInputCommandInteraction
      | StringSelectMenuInteraction
      | ModalSubmitInteraction
  ) => {
    const type = (
      interaction.isChatInputCommand()
        ? interaction.options.getSubcommandGroup(true)
        : interaction.customId.split("-")[1]
    ) as LeaderboardTypes;

    const leaderboard = interaction.isChatInputCommand()
      ? interaction.options.getSubcommand()
      : interaction.isStringSelectMenu()
      ? interaction.values[0]
      : interaction.customId.split("-")[2];

    if (
      interaction.isButton() &&
      interaction.customId.split("-")[3] == "modal"
    ) {
      return await interaction.showModal(leaderboardModal(type, leaderboard));
    }

    const page = interaction.isChatInputCommand()
      ? interaction.options.getInteger("page") ?? 1
      : interaction.isButton()
      ? parseInt(interaction.customId.split("-")[3])
      : interaction.isModalSubmit()
      ? parseInt(interaction.fields.getTextInputValue("page"))
      : 1;

    const configType = leaderboardsConfig[type];
    const dataSet = configType.dataSet(cache);

    const maxPage = Math.ceil(dataSet.length / pageSize);
    if (page > maxPage || page < 1 || Number.isNaN(page))
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "This page doesn't exist.",
              "Invalid Page"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    const leaderboardData = getLeaderboardData(
      dataSet,
      configType.leaderboards[leaderboard].getValue,
      configType.mapData,
      page
    );

    await deferReply(interaction, {
      embeds: [
        leaderboardEmbed(
          interaction.user,
          leaderboardData,
          type,
          leaderboard,
          page,
          maxPage
        ),
      ],
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          leaderboardMenu(type, leaderboard)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          leaderboardButtons(page, maxPage, type, leaderboard)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
