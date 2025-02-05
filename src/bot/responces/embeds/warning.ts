import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Emojis from "../../../classes/emojis";

const warnEmbed = (user: User, warning: string, warningTitle: string) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle(warningTitle)
      .setColor("Yellow")
      .setDescription(`${Emojis.warning} ${warning}`),
    user
  );
};

export default warnEmbed;
