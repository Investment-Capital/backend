import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./addDefaults";
import emojis from "../../../classes/emojis";

const executionError = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("An Error has occured")
      .setColor("Red")
      .setDescription(
        `${emojis.cross} An error has occured while executing this interaction, the developer has automatically been notified.`
      ),
    user
  );
};

export default executionError;
