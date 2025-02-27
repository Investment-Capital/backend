import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import Stocks from "../../../../../enum/stocks";
import stocksConfig from "../../../../../config/stocksConfig";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import editInvestor from "../../../../../functions/editInvestor";
import investmentBoughtEmbed from "../../../../responces/embeds/investmentBought";
import stocksViewButton from "../../../../responces/components/buttons/stocksView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import CommandExecute from "../../../../../types/commandExecute";
import getInvestorUpgradeAmount from "../../../../../functions/getInvestorUpgradeAmount";
import Upgrades from "../../../../../enum/upgrades";
import formatNumber from "../../../../../functions/formatNumber";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "buy"
      : false,

  requiredPresige: (_, interaction) =>
    interaction.isChatInputCommand()
      ? stocksConfig[interaction.options.getSubcommand() as Stocks]
          .requiredPrestige
      : 1,
  execute: async (cache, investor, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const stock = interaction.options.getSubcommand() as Stocks;
    const amount = interaction.options.getInteger("amount") ?? 1;
    const config = stocksConfig[stock];
    const maxStocks = getInvestorUpgradeAmount(investor, Upgrades.stocksLimit);
    const totalPrice = amount * cache.markets.stocks[stock].price;

    if (amount + investor.stocks[stock] > maxStocks)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You can only own ${formatNumber(maxStocks)} of each stock.`,
              "Limit Reached"
            ),
          ],
        },
        { ephemeral: true }
      );

    if (totalPrice > investor.cash)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have enough cash for this.",
              "Not Enough Cash"
            ),
          ],
        },
        { ephemeral: true }
      );

    editInvestor(cache, investor, (investor) => {
      investor.cash -= totalPrice;
      investor.stocks[stock] += amount;
    });

    await deferReply(interaction, {
      embeds: [
        investmentBoughtEmbed(
          interaction.user,
          config.image,
          amount,
          totalPrice,
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
