import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";
import Markets from "../../../../enum/markets";
import MarketGraphLengths from "../../../../enum/marketGraphLengths";

export default [
  new SlashCommandBuilder()
    .setName("markets")
    .setDescription("View the markets.")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("view").setDescription("View the markets.");

      for (const market of Object.values(Markets)) {
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(market.toLowerCase())
            .setDescription(`View the ${market} market.`)
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
        );
      }

      return subcommandGroup;
    })
    .toJSON(),
] satisfies Command["data"];
