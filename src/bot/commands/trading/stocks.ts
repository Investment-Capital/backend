import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Investor from "../../../types/investor";
import editInvestor from "../../../functions/editInvestor";
import Cache from "../../../types/cache";
import deferReply from "../../../functions/deferReply";
import notEnoughCash from "../../responces/embeds/notEnoughCash";
import invalidInvestment from "../../responces/embeds/invalidInvestment";
import Stocks from "../../../enum/stocks";
import stockConfig from "../../../config/stockConfig";
import investmentSold from "../../responces/embeds/investmentSold";
import investmentBought from "../../responces/embeds/investmentBought";

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
    .toJSON(),

  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const subcomamndGroup = interaction.options.getSubcommandGroup();
    const stock = interaction.options.getSubcommand() as Stocks;
    const amount = interaction.options.getNumber("amount") ?? 1;
    const config = stockConfig[stock];

    if (subcomamndGroup == "sell") {
      const cashGained = amount * cache.markets.stocks[stock].price;

      if (investor.stocks[stock] < amount)
        return await deferReply(
          interaction,
          {
            embeds: [invalidInvestment(interaction.user)],
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
          investmentSold(interaction.user, config.image, amount, cashGained),
        ],
      });
    } else if (subcomamndGroup == "buy") {
      const totalPrice = amount * cache.markets.stocks[stock].price;

      if (totalPrice > investor.cash)
        return await deferReply(
          interaction,
          { embeds: [notEnoughCash(interaction.user)] },
          { ephemeral: true }
        );

      editInvestor(cache, investor, (investor) => {
        investor.cash -= totalPrice;
        investor.stocks[stock] += amount;
      });

      await deferReply(interaction, {
        embeds: [
          investmentBought(interaction.user, config.image, amount, totalPrice),
        ],
      });
    }
  },

  requiedPrestige: {
    commands: Object.values(Stocks).map((stock) => {
      const config = stockConfig[stock];

      return {
        requiredPrestige: config.requiredPrestige,
        subcommand: stock,
        subcommandGroup: "buy",
      };
    }),
  },
} satisfies Command;
