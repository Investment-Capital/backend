import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const invalidPrestigeEmbed = (user: User, requiredPrestige: number) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Invalid Prestige")
      .setColor("Red")
      .setDescription(
        `${emojis.cross} You need to be prestige ${requiredPrestige} for this action.`
      ),
    user
  );
};

export default invalidPrestigeEmbed;
