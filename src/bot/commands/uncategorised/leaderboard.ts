import { Interaction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import leaderboardsConfig from "../../../config/leaderboardsConfig";
import Cache from "../../../types/cache";
import getLeaderboardData from "../../../functions/getLeaderboardData";
import deferReply from "../../../functions/deferReply";
import ordinal from "ordinal";

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
          );
        }

        return subcommandGroup;
      });
    }

    return command.toJSON();
  })(),

  execute: async (cache: Cache, interaction: Interaction) => {
    const page = 1;
    const type = interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup(true)
      : "";
    const leaderboard = interaction.isChatInputCommand()
      ? interaction.options.getSubcommand()
      : "";

    const leaderboardData = getLeaderboardData(cache, type, leaderboard, page);

    await deferReply(interaction, {
      content: leaderboardData
        .map(
          (data) => `${ordinal(data.position)}. ${data.name} - ${data.value}`
        )
        .join("\n"),
    });
  },
  requiresAccount: false,
} satisfies Command;
