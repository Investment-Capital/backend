import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const invalidInvestmentEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Invalid Investment")
      .setColor("Red")
      .setDescription(
        `${emojis.cross} You don't have this/enough of this investment.`
      ),
    user
  );
};

export default invalidInvestmentEmbed;
