import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";

const prestigeViewEmbed = (user: User, currentPrestige: number) => {
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
        name: "Progressive Bonuses",
        value: "Unlock new investments and commands to progress faster.",
      })
      .addFields({
        name: "Other Rewards",
        value: "Coming Soon!",
      }),
    user
  );
};

export default prestigeViewEmbed;
