import { SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Stocks from "../../../enum/stocks";

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
                .setAutocomplete(true)
                .setRequired(true)
            )
        )
      );

      return subcommandGroup;
    })
    .toJSON(),
  execute: () => null,
} satisfies Command;
