import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import Stocks from "../../../../enum/stocks";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";

export default new SlashCommandBuilder()
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
            ...Object.values(MarketGraphLengths).map((length) => ({
              name: length,
              value: length,
            }))
          )
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("view").setDescription("View the stocks you own.")
  )
  .toJSON() satisfies Command["data"];
