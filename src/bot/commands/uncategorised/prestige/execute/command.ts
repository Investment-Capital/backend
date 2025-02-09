import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Investor from "../../../../../types/investor";
import deferReply from "../../../../../functions/deferReply";
import prestigeViewEmbed from "../../../../responces/embeds/prestigeView";
import Cache from "../../../../../types/cache";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand(),
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    await deferReply(interaction, {
      embeds: [
        prestigeViewEmbed(
          interaction.user,
          investor.prestige,
          cache.commands,
          cache.client.application?.commands.cache.toJSON() ?? []
        ),
      ],
    });
  },
} satisfies Command["execute"][number];
