import { User, EmbedBuilder, ApplicationCommand } from "discord.js";
import emojis from "../../../classes/emojis";
import addDefaults from "./defaults/addDefaults";
import MarkdownManager from "../../../classes/markdownManager";

const accountCreatedEmbed = (user: User, commands?: ApplicationCommand[]) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Account Created")
      .setDescription(
        `${
          emojis.check
        } Account successfully created, check it out with ${MarkdownManager.slashCommand(
          "/portfolio",
          commands?.find((command) => command.name == "portfolio")
        )}`
      )
      .setColor("Green"),
    user
  );
};

export default accountCreatedEmbed;
