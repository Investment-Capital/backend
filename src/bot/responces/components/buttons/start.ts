import { ButtonBuilder, ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const startButton = (cache: Cache) =>
  new ButtonBuilder()
    .setLabel("Start")
    .setCustomId(CustomIdManager.create(cache, { id: "start" }))
    .setStyle(ButtonStyle.Success)
    .setEmoji(Emojis.check);

export default startButton;
