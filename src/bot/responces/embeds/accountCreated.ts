import { User, EmbedBuilder } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const accountCreatedEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Account Created")
      .setDescription(
        `${emojis.check} Account successfully created, check it out with /portpholio`
      )
      .setColor("Green"),
    user
  );
};

export default accountCreatedEmbed;
