import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import Command from "../../../types/command";
import leaderboardsConfig from "../../../config/leaderboardsConfig";
import Cache from "../../../types/cache";
import getLeaderboardData from "../../../functions/getLeaderboardData";
import deferReply from "../../../functions/deferReply";
import LeaderboardTypes from "../../../enum/leaderboardTypes";
import pageSize from "../../../config/pageSize";
import leaderboardEmbed from "../../responces/embeds/leaderboard";
import leaderboardMenu from "../../responces/components/menus/leaderboard";
import leaderboardButtons from "../../responces/components/buttons/leaderboard";
import leaderboardModal from "../../responces/modals/leaderboard";
import invalidPageEmbed from "../../responces/embeds/invalidPage";

export default {
  data: (() => {
    const command = new SlashCommandBuilder()
      .setName("leaderboard")
      .setDescription("View the leaderboards.");

    for (const [type, data] of Object.entries(leaderboardsConfig)) {
      command.addSubcommandGroup((subcommandGroup) => {
        subcommandGroup
          .setName(type)
          .setDescription(`View the ${type} leaderboards.`);

        for (const leaderboard of Object.keys(data.leaderboards)) {
          subcommandGroup.addSubcommand((subcommand) =>
            subcommand
              .setName(leaderboard)
              .setDescription(`View the ${type} ${leaderboard} leaderboard.`)
              .addIntegerOption((option) =>
                option
                  .setName("page")
                  .setDescription(
                    `What page of the ${type} ${leaderboard} leaderboard to view.`
                  )
                  .setMinValue(1)
              )
          );
        }

        return subcommandGroup;
      });
    }

    return command.toJSON();
  })(),

  validateComponent: (interaction) =>
    interaction.customId.startsWith("leaderboard"),

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
          embeds: [invalidPageEmbed(interaction.user)],
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
  requiresAccount: false,
} satisfies Command;
