import { EmbedBuilder, User } from "discord.js";

import LeaderboardData from "../../../types/leaderboardData";
import addDefaults from "./defaults/addDefaults";
import ordinal from "ordinal";
import LeaderboardTypes from "../../../enum/leaderboardTypes";
import Emojis from "../../../classes/emojis";
import capitalizeWords from "../../../functions/capitalizeWords";

const leaderboardEmbed = (
  user: User,
  data: LeaderboardData[],
  leaderboardType: LeaderboardTypes,
  leaderboard: string,
  page: number,
  maxPage: number
) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(
        `${capitalizeWords(`${leaderboardType} ${leaderboard}`)} Leaderboard`
      )
      .setColor("Blue")
      .setDescription(
        data
          .map(
            (data) =>
              `**${ordinal(data.position)}:** ${data.name} • ${
                data.formattedValue
              }`
          )
          .join("\n")
      ),
    user
  ).setFooter({
    text: `${Emojis.page} Page ${page}/${maxPage}`,
  });
};

export default leaderboardEmbed;
