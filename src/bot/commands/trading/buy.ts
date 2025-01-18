import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Stocks from "../../../enum/stocks";
import Cache from "../../../types/cache";
import Investor from "../../../types/investor";
import editInvestor from "../../../functions/editInvestor";
import stockConfig from "../../../config/stockConfig";
import investmentBought from "../../responces/embeds/investmentBought";
import deferReply from "../../../functions/deferReply";
import notEnoughCash from "../../responces/embeds/notEnoughCash";

export default {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy something.")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("stock").setDescription("Buy a stock.");

      Object.values(Stocks).map((stock) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(stock)
            .setDescription(`Buy ${stock} stock`)
            .addNumberOption((option) =>
              option
                .setName("amount")
                .setDescription(`The amount of ${stock} stock you want to buy.`)
                .setAutocomplete(false) // adding soom
                .setRequired(false)
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

    if (subcomamndGroup == "stock") {
      const stock = interaction.options.getSubcommand() as Stocks;
      const amount = interaction.options.getNumber("amount") ?? 1;
      const config = stockConfig[stock];

      const totalPrice = amount * cache.markets.stocks[stock].price;

      if (totalPrice > investor.cash)
        return await deferReply(
          interaction,
          { embeds: [notEnoughCash(interaction.user)] },
          { ephemeral: true }
        );

      editInvestor(
        cache,
        investor,
        (investor) => (investor.stocks[stock] += amount)
      );

      await deferReply(interaction, {
        embeds: [
          investmentBought(interaction.user, config.image, amount, totalPrice),
        ],
      });
    }
  },
} satisfies Command;
