import { UserSelectMenuBuilder } from "discord.js";
import CustomIdManager from "../../../../classes/customIdManager";
import Cache from "../../../../types/cache";

const portfolioMenu = (cache: Cache, currentValue: string) => {
  return new UserSelectMenuBuilder()
    .setCustomId(CustomIdManager.create(cache, { id: "portfolio" }))
    .setDefaultUsers(currentValue);
};

export default portfolioMenu;
