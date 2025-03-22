import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import ShopItems from "../../../../enum/shopItems";

export default [
  new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Infomation about the shop.")
    .addSubcommand((subcommand) =>
      subcommand.setName("view").setDescription("View the shop.")
    )
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup
        .setName("buy")
        .setDescription("Buy an upgrade from the shop.");

      Object.values(ShopItems).map((item) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(item)
            .setDescription(`Buy a level of the ${item} upgrade.`)
        )
      );

      return subcommandGroup;
    })
    .toJSON(),
] satisfies Command["data"];
