import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
import Stocks from "../../../../../enum/stocks";
import stocksConfig from "../../../../../config/stocksConfig";
import deferReply from "../../../../../functions/deferReply";
import editInvestor from "../../../../../functions/editInvestor";
import investmentSoldEmbed from "../../../../responces/embeds/investmentSold";
import errorEmbed from "../../../../responces/embeds/error";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "sell"
      : false,
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const stock = interaction.options.getSubcommand() as Stocks;
    const amount = interaction.options.getInteger("amount") ?? 1;
    const config = stocksConfig[stock];
    const cashGained = amount * cache.markets.stocks[stock].price;

    if (investor.stocks[stock] < amount)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have enough of these stocks.",
              "Invalid Investment"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    editInvestor(cache, investor, (investor) => {
      investor.cash += cashGained;
      investor.stocks[stock] -= amount;
    });

    await deferReply(interaction, {
      embeds: [
        investmentSoldEmbed(interaction.user, config.image, amount, cashGained),
      ],
    });
  },
} satisfies Command["execute"][number];
