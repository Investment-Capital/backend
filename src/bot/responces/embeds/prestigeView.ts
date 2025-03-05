import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";
import prestigeConfig from "../../../config/prestigeConfig";
import Emojis from "../../../classes/emojis";
import formatNumber from "../../../functions/formatNumber";

const prestigeViewEmbed = (user: User, currentPrestige: number) => {
  const config = prestigeConfig[currentPrestige + 1];

  return addDefaults(
    config
      ? new EmbedBuilder()
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
              value: Emojis.cash + " $" + formatNumber(config.cashRequired),
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
          )
      : new EmbedBuilder()
          .setTitle("Final Prestige")
          .setColor("Green")
          .setDescription(
            `${Emojis.check} You have reached the final prestige!\nNew prestiges will be added in the future.`
          ),
    user
  );
};

export default prestigeViewEmbed;
