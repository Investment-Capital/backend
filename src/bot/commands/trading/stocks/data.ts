import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import Stocks from "../../../../enum/stocks";

export default [
  new SlashCommandBuilder()
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
                .setMinValue(1)
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
                .setMinValue(1)
            )
        )
      );

      return subcommandGroup;
    })

    .addSubcommand((subcommand) =>
      subcommand.setName("view").setDescription("View the stocks you own.")
    )
    .toJSON(),
] satisfies Command["data"];
