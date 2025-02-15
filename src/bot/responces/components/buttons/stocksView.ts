import { ButtonBuilder, ButtonStyle } from "discord.js";
import getRandomIndex from "../../../../functions/getRandomIndex";
import stocksConfig from "../../../../config/stocksConfig";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const stocksViewButton = (cache: Cache) =>
  new ButtonBuilder()
    .setCustomId(CustomIdManager.create(cache, { id: "stocksView" }))
    .setLabel("Stocks")
    .setStyle(ButtonStyle.Primary)
    .setEmoji(
      getRandomIndex(Object.values(stocksConfig).map((config) => config.emoji))
    );

export default stocksViewButton;
