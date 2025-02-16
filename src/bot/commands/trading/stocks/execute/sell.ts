import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import Stocks from "../../../../../enum/stocks";
import stocksConfig from "../../../../../config/stocksConfig";
import deferReply from "../../../../../functions/deferReply";
import editInvestor from "../../../../../functions/editInvestor";
import investmentSoldEmbed from "../../../../responces/embeds/investmentSold";
import errorEmbed from "../../../../responces/embeds/error";
import stocksViewButton from "../../../../responces/components/buttons/stocksView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "sell"
      : false,
  execute: async (cache, investor, interaction) => {
    if (!interaction.isChatInputCommand()) return;

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
        investmentSoldEmbed(
          interaction.user,
          config.image,
          amount,
          cashGained,
          config.income * amount
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          stocksViewButton(cache),
          marketButton(cache, Markets.stocks)
        ),
      ],
    });
  },
} satisfies CommandExecute;
