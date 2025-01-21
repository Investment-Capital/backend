import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Stocks from "../../../enum/stocks";
import Cache from "../../../types/cache";
import Investor from "../../../types/investor";
import editInvestor from "../../../functions/editInvestor";
import stockConfig from "../../../config/stockConfig";
import deferReply from "../../../functions/deferReply";
import investmentSold from "../../responces/embeds/investmentSold";

export default {
  data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Sell something.")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("stock").setDescription("Sell a stock.");

      Object.values(Stocks).map((stock) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(stock)
            .setDescription(`Sell ${stock} stock`)
            .addNumberOption((option) =>
              option
                .setName("amount")
                .setDescription(
                  `The amount of ${stock} stock you want to sell.`
                )
                .setAutocomplete(false) // adding soon
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

      if (investor.stocks[stock] < amount)
        return console.log("Invalid amount of stocks");

      const cashGained = amount * cache.markets.stocks[stock].price;

      editInvestor(cache, investor, (investor) => {
        investor.cash += cashGained;
        investor.stocks[stock] -= amount;
      });

      await deferReply(interaction, {
        embeds: [
          investmentSold(interaction.user, config.image, amount, cashGained),
        ],
      });
    }
  },
} satisfies Command;
