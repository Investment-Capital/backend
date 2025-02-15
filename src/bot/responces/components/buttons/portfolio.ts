import { ButtonBuilder, ButtonStyle } from "discord.js";
import Emojis from "../../../../classes/emojis";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const portfolioButton = (cache: Cache) =>
  new ButtonBuilder()
    .setLabel("Portfolio")
    .setCustomId(CustomIdManager.create(cache, { id: "portfolio" }))
    .setStyle(ButtonStyle.Primary)
    .setEmoji(Emojis.officeWorker);

export default portfolioButton;
