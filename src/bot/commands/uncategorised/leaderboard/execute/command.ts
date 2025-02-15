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
import CustomIdManager from "../../../../../classes/customIdManager";

export default {
  validateCommand: (cache: Cache, interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? true
      : "customId" in interaction
      ? CustomIdManager.parse(cache, interaction.customId).id == "leaderboard"
      : false,

  execute: async (
    cache: Cache,
    interaction:
      | ButtonInteraction
      | ChatInputCommandInteraction
      | StringSelectMenuInteraction
      | ModalSubmitInteraction
  ) => {
    const type: LeaderboardTypes = (
      interaction.isChatInputCommand()
        ? interaction.options.getSubcommandGroup(true)
        : CustomIdManager.parse(cache, interaction.customId).type
    ) as LeaderboardTypes;

    const leaderboard = interaction.isChatInputCommand()
      ? interaction.options.getSubcommand()
      : interaction.isStringSelectMenu()
      ? interaction.values[0]
      : CustomIdManager.parse(cache, interaction.customId).leaderboard;

    if (
      interaction.isButton() &&
      CustomIdManager.parse(cache, interaction.customId)?.pageModal
    ) {
      return await interaction.showModal(
        leaderboardModal(cache, type, leaderboard)
      );
    }

    const page = interaction.isChatInputCommand()
      ? interaction.options.getInteger("page") ?? 1
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).page
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
          leaderboardMenu(cache, type, leaderboard)
        ),
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          leaderboardButtons(cache, page, maxPage, type, leaderboard)
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
