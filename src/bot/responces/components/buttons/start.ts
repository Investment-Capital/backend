import { ButtonBuilder, ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";

const start = new ButtonBuilder()
  .setLabel("Start")
  .setCustomId("start")
  .setStyle(ButtonStyle.Success)
  .setEmoji(Emojis.check);

export default start;
