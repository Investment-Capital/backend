import { ButtonBuilder, ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";

const startButton = new ButtonBuilder()
  .setLabel("Start")
  .setCustomId("start")
  .setStyle(ButtonStyle.Success)
  .setEmoji(Emojis.check);

export default startButton;
