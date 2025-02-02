import { StringSelectMenuBuilder } from "discord.js";
import LeaderboardTypes from "../../../../enum/leaderboardTypes";
import leaderboardsConfig from "../../../../config/leaderboardsConfig";
import capitalizeWords from "../../../../functions/capitalizeWords";

const leaderboardMenu = (
  leaderboardType: LeaderboardTypes,
  currentLeaderboard: string
) => {
  const leaderboards = leaderboardsConfig[leaderboardType].leaderboards;

  return new StringSelectMenuBuilder()
    .setCustomId(`leaderboard-${leaderboardType}`)
    .addOptions(
      Object.entries(leaderboards).map(([name, { emoji }]) => ({
        emoji,
        value: name,
        label: capitalizeWords(name),
        default: name == currentLeaderboard,
        description: `View the ${leaderboardType} ${name} leaderboard.`,
      }))
    );
};

export default leaderboardMenu;
