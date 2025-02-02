import { ModalBuilder, TextInputStyle } from "discord.js";
import LeaderboardTypes from "../../../enum/leaderboardTypes";
import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";

const leaderboardModal = (
  leaderboardType: LeaderboardTypes,
  leaderboard: string
) => {
  return new ModalBuilder()
    .setTitle(`Enter Leaderboard Page`)
    .setCustomId(`leaderboard-${leaderboardType}-${leaderboard}`)
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("page")
          .setLabel("Page")
          .setStyle(TextInputStyle.Short)
      )
    );
};

export default leaderboardModal;
