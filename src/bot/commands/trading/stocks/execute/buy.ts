import { ChatInputCommandInteraction, Interaction } from "discord.js";
import Command from "../../../../../types/command";
import Stocks from "../../../../../enum/stocks";
import stocksConfig from "../../../../../config/stocksConfig";
import Cache from "../../../../../types/cache";
import Investor from "../../../../../types/investor";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import editInvestor from "../../../../../functions/editInvestor";
import investmentBoughtEmbed from "../../../../responces/embeds/investmentBought";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "buy"
      : false,
  execute: async (
    cache: Cache,
    investor: Investor,
    interaction: ChatInputCommandInteraction
  ) => {
    const stock = interaction.options.getSubcommand() as Stocks;
    const amount = interaction.options.getInteger("amount") ?? 1;
    const config = stocksConfig[stock];

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
  },
} satisfies Command["execute"][number];
