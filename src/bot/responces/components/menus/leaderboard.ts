import { StringSelectMenuBuilder } from "discord.js";
import LeaderboardTypes from "../../../../enum/leaderboardTypes";
import leaderboardsConfig from "../../../../config/leaderboardsConfig";
import capitalizeWords from "../../../../functions/capitalizeWords";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const leaderboardMenu = (
  cache: Cache,
  leaderboardType: LeaderboardTypes,
  currentLeaderboard: string
) => {
  const leaderboards = leaderboardsConfig[leaderboardType].leaderboards;

  return new StringSelectMenuBuilder()
    .setCustomId(
      CustomIdManager.create(cache, {
        id: "leaderboard",
        type: leaderboardType,
      })
    )
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
