import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

const nameAlreadyUsed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle("Invalid Name")
      .setDescription(
        `${emojis.cross} This name has already been used, try to enter a different name.`
      ),
    user
  );
};

export default nameAlreadyUsed;
