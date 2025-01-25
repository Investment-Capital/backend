import { ApplicationCommand, EmbedBuilder, User } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";
import MarkdownManager from "../../../classes/markdownManager";

const invalidAccount = (user: User, commands: ApplicationCommand[]) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Invalid Account")
      .setColor("Red")
      .setDescription(
        `${
          emojis.cross
        } Please create an account with ${MarkdownManager.slashCommand(
          "/start",
          commands.find((command) => command.name == "start")
        )} to use this command.`
      ),
    user
  );
};

export default invalidAccount;
