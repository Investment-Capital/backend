import { User, EmbedBuilder } from "discord.js";
import addDefaults from "./addDefaults";
import emojis from "../../../classes/emojis";

const accountCreated = (user: User) => {
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

export default accountCreated;
