import { UserSelectMenuBuilder } from "discord.js";

const portfolioMenu = (currentValue: string) => {
  return new UserSelectMenuBuilder()
    .setCustomId("portfolio")
    .setMaxValues(1)
    .setDefaultUsers(currentValue);
};

export default portfolioMenu;
