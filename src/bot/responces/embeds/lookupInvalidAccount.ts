import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const lookupInvalidAccountEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle("Invalid Account")
      .setDescription(`${emojis.cross} This user has not created an account.`),
    user
  );
};

export default lookupInvalidAccountEmbed;
