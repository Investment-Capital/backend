import { UserSelectMenuBuilder } from "discord.js";

const portfolioMenu = (currentValue: string) => {
  return new UserSelectMenuBuilder()
    .setCustomId("portfolio")
    .setDefaultUsers(currentValue);
};

export default portfolioMenu;
