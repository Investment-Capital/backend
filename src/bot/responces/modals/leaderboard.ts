import { ModalBuilder, TextInputStyle } from "discord.js";
import LeaderboardTypes from "../../../enum/leaderboardTypes";
import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import CustomIdManager from "../../../classes/customIdManager";
import Cache from "../../../types/cache";

const leaderboardModal = (
  cache: Cache,
  leaderboardType: LeaderboardTypes,
  leaderboard: string
) => {
  return new ModalBuilder()
    .setTitle(`Enter Leaderboard Page`)
    .setCustomId(
      CustomIdManager.create(cache, {
        id: "leaderboard",
        type: leaderboardType,
        leaderboard,
      })
    )

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
