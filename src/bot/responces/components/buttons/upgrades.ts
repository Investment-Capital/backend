import { ButtonBuilder, ButtonStyle } from "discord.js";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";
import Emojis from "../../../../classes/emojis";

const upgradesViewButton = (cache: Cache) =>
  new ButtonBuilder()
    .setCustomId(CustomIdManager.create(cache, { id: "upgradesView" }))
    .setLabel("Upgrades")
    .setStyle(ButtonStyle.Primary)
    .setEmoji(Emojis.clamp);

export default upgradesViewButton;
