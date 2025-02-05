import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const errorEmbed = (user: User, error: string, errorTitle: string) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle(errorTitle)
      .setDescription(`${emojis.cross} ${error}`),
    user
  );
};

export default errorEmbed;
