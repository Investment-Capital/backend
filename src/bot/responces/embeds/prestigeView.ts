import { ApplicationCommand, EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import Command from "../../../types/command";
import MarkdownManager from "../../../classes/markdownManager";
import getUnlockedCommands from "../../../functions/getUnlockedCommands";

const prestigeViewEmbed = (
  user: User,
  currentPrestige: number,
  commands: Command[],
  applicationCommands: ApplicationCommand[]
) => {
  const unlockedCommands = getUnlockedCommands(
    currentPrestige + 1,
    commands,
    applicationCommands
  );

  return addDefaults(
    new EmbedBuilder()
      .setTitle("Prestige View")
      .setColor("Blue")
      .setDescription(
        `These are the rewards for presting from prestige ${currentPrestige} to ${
          currentPrestige + 1
        }.`
      )
      .addFields({
        name: "Unlocked Commands",
        value:
          unlockedCommands.length == 0
            ? "No commands unlocked from prestiging."
            : unlockedCommands
                .map((unlockedCommand) =>
                  MarkdownManager.slashCommand(
                    unlockedCommand.command,
                    unlockedCommand.data
                  )
                )
                .join("\n"),
      }),
    user
  );
};

export default prestigeViewEmbed;
