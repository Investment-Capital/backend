import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Cache from "../../../types/cache";
import editInvestor from "../../../functions/editInvestor";
import Investor from "../../../types/investor";

export default {
  data: new SlashCommandBuilder()
    .setName("setprestige")
    .setDescription("???")
    .addIntegerOption((opt) =>
      opt.setName("prestige").setDescription("hi").setRequired(true)
    ),

  execute: (cache: Cache, interaction: ChatInputCommandInteraction) => {
    const prestige = interaction.options.getInteger("prestige") as number;

    editInvestor(
      cache,
      cache.investors.find(
        (inv) => inv.user.id == interaction.user.id
      ) as Investor,
      (inv) => (inv.prestige = prestige)
    );
  },
} satisfies Command;
