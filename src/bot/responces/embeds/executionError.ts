import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

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
