import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import prestigeConfig from "../../../config/prestigeConfig";
import Emojis from "../../../classes/emojis";
import formatNumber from "../../../functions/formatNumber";

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
      .addFields(
        {
          name: "Cash Required",
          value:
            Emojis.cash +
            " $" +
            formatNumber(prestigeConfig[currentPrestige + 1].cashRequired),
          inline: true,
        },
        {
          name: "Rewards",
          inline: true,
          value: "Coming VERY soon.",
        },
        {
          name: "Unlocked Commands",
          value: "Comming VERY soon.",
        }
      ),
    user
  );
};

export default prestigeViewEmbed;
