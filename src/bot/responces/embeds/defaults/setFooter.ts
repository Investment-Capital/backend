import { EmbedBuilder } from "discord.js";
import getRandomIndex from "../../../../functions/getRandomIndex";
import embedFooterTips from "../../../../config/embedFooterTips";
import Emojis from "../../../../classes/emojis";

const setFooter = (embed: EmbedBuilder) =>
  embed.setFooter({
    text: Emojis.questionMark + " " + getRandomIndex(embedFooterTips),
  });

export default setFooter;
