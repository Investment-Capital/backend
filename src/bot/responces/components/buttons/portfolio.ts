import { ButtonBuilder, ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";

const portfolio = new ButtonBuilder()
  .setLabel("Portfolio")
  .setCustomId("portfolio")
  .setStyle(ButtonStyle.Primary)
  .setEmoji(Emojis.officeWorker);

export default portfolio;
