import { EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";

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
