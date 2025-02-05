import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Investor from "../../../types/investor";
import editInvestor from "../../../functions/editInvestor";
import Cache from "../../../types/cache";
import deferReply from "../../../functions/deferReply";
import Stocks from "../../../enum/stocks";
import stocksConfig from "../../../config/stocksConfig";
import investmentSoldEmbed from "../../responces/embeds/investmentSold";
import investmentBoughtEmbed from "../../responces/embeds/investmentBought";
import MarketGraphTimes from "../../../enum/marketGraphTimes";
import errorEmbed from "../../responces/embeds/error";
import marketEmbed from "../../responces/embeds/market";
import stocksViewEmbed from "../../responces/embeds/stocksView";

export default {
  data: new SlashCommandBuilder()
    .setName("stocks")
    .setDescription("Manage Stocks.")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("sell").setDescription("Sell stocks.");

      Object.values(Stocks).map((stock) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(stock)
            .setDescription(`Sell a ${stock}.`)
            .addIntegerOption((option) =>
              option
                .setName("amount")
                .setDescription(`The amount of ${stock} you want to sell.`)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("buy").setDescription("Buy stocks.");

      Object.values(Stocks).map((stock) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(stock)
            .setDescription(`Buy a ${stock}.`)
            .addIntegerOption((option) =>
              option
                .setName("amount")
                .setDescription(`The amount of ${stock} you want to buy.`)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("market")
        .setDescription("View the stocks market.")
        .addStringOption((option) =>
          option
            .setName("graph-length")
            .setDescription("Change the graph duration")
            .addChoices(
              ...Object.values(MarketGraphTimes).map((name) => ({
                name,
                value: name,
              }))
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("view").setDescription("View the stocks you own.")
    )
    .toJSON(),

  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const subcomamndGroup = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "market" && !subcomamndGroup) {
      const timePeriod = (interaction.options.getString("graph-length") ??
        Object.keys(MarketGraphTimes)[0]) as MarketGraphTimes;

      await deferReply(interaction, {
        embeds: [
          marketEmbed(
            interaction.user,
            cache.markets.stocks,
            cache.marketGraphs.stocks[timePeriod]
          ),
        ],
      });
    } else if (subcommand == "view" && !subcomamndGroup) {
      return await deferReply(interaction, {
        embeds: [stocksViewEmbed(interaction.user, investor)],
      });
    } else {
      const stock = subcommand as Stocks;
      const amount = interaction.options.getInteger("amount") ?? 1;
      const config = stocksConfig[stock];

      if (subcomamndGroup == "sell") {
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
              cashGained
            ),
          ],
        });
      } else if (subcomamndGroup == "buy") {
        const totalPrice = amount * cache.markets.stocks[stock].price;

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
              totalPrice
            ),
          ],
        });
      }
    }
  },

  requiedPrestige: {
    commands: Object.values(Stocks).flatMap((stock) => {
      const config = stocksConfig[stock];

      return ["buy", "sell"].map((subcommandGroup) => ({
        requiredPrestige: config.requiredPrestige,
        subcommand: stock,
        subcommandGroup: subcommandGroup,
      }));
    }),
    default: Math.min(
      ...Object.values(stocksConfig).map((config) => config.requiredPrestige)
    ),
  },
} satisfies Command;
