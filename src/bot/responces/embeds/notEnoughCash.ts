import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const notEnoughCashEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle("More Cash Required")
      .setDescription(`${emojis.cross} You don't have enough cash for this.`),
    user
  );
};

export default notEnoughCashEmbed;
