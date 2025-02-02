import { ButtonBuilder } from "@discordjs/builders";
import LeaderboardTypes from "../../../../enum/leaderboardTypes";
import { ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";

const leaderboardButtons = (
  page: number,
  maxPage: number,
  leaderboardType: LeaderboardTypes,
  leaderboard: string
) => {
  return [
    ...[page - 5, page - 1, page + 1, page + 5].map((page, index) =>
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`leaderboard-${leaderboardType}-${leaderboard}-${page}`)
        .setEmoji({
          name: [
            Emojis.doubleArrowBackward,
            Emojis.arrowBackward,
            Emojis.arrowForward,
            Emojis.doubleArrowForward,
          ][index],
        })
        .setDisabled(page < 1 || page > maxPage)
    ),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`leaderboard-${leaderboardType}-${leaderboard}-modal`)
      .setEmoji({ name: Emojis.page })
      .setLabel("Input Page"),
  ];
};

export default leaderboardButtons;
