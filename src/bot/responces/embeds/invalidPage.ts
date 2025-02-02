import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const invalidPageEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Invalid Page")
      .setColor("Red")
      .setDescription(`${emojis.cross} This page doesn't exist.`),
    user
  );
};

export default invalidPageEmbed;
