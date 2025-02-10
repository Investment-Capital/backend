import { ButtonBuilder, ButtonStyle } from "discord.js";
import getRandomIndex from "../../../../functions/getRandomIndex";
import stocksConfig from "../../../../config/stocksConfig";

const stocksViewButton = () =>
  new ButtonBuilder()
    .setCustomId("stocksView")
    .setLabel("Stocks")
    .setStyle(ButtonStyle.Primary)
    .setEmoji(
      getRandomIndex(Object.values(stocksConfig).map((config) => config.emoji))
    );

export default stocksViewButton;
