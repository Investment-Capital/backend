import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./addDefaults";
import emojis from "../../../classes/emojis";

const alreadyCreatedAccount = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setColor("Red")
      .setTitle("Account Already Created")
      .setDescription(
        `${emojis.cross} You have already created an investment capital account.`
      ),
    user
  );
};

export default alreadyCreatedAccount;
