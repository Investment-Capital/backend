import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import leaderboardsConfig from "../../../../config/leaderboardsConfig";

export default (() => {
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
})() satisfies Command["data"];
