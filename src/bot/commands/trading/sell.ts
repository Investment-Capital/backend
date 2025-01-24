import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../../types/command";
import Stocks from "../../../enum/stocks";
import Cache from "../../../types/cache";
import Investor from "../../../types/investor";
import editInvestor from "../../../functions/editInvestor";
import stockConfig from "../../../config/stockConfig";
import deferReply from "../../../functions/deferReply";
import investmentSold from "../../responces/embeds/investmentSold";
import RealEstate from "../../../enum/realEstate";
import searchItems from "../../../functions/searchItems";
import realEstateConfig from "../../../config/realEstateConfig";
import buildingSold from "../../responces/embeds/buildingSold";

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
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("realestate").setDescription("Sell real estate.");

      Object.values(RealEstate).map((realEstate) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstate)
            .setDescription(`Sell a ${realEstate}`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the ${realEstate} you want to sell`
                )
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
      );

      return subcommandGroup;
    })
    .toJSON(),

  autocomplete: (
    _,
    investor: Investor,
    interaction: AutocompleteInteraction
  ) => {
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const search = interaction.options.getFocused();

    if (subcommandGroup == "realestate") {
      const realEstateType = interaction.options.getSubcommand() as RealEstate;
      const userRealEstate = investor.realEstate.filter(
        (realEstate) => realEstate.type == realEstateType
      );

      interaction.respond(
        searchItems(
          search,
          userRealEstate.map((realEstate) => realEstate.name)
        ).map((search) => ({ name: search, value: search }))
      );
    }
  },

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
    } else if (subcomamndGroup == "realestate") {
      const realEstateType = interaction.options.getSubcommand() as RealEstate;
      const name = interaction.options.getString("name", true);
      const realEstate = investor.realEstate.filter(
        (realEstate) =>
          realEstate.type == realEstateType && realEstate.name == name
      );

      if (!realEstate) return console.log("Invalid real estate");

      const config = realEstateConfig[realEstateType];
      const cashGained = cache.markets.realEstate[realEstateType].price;

      editInvestor(cache, investor, (investor) => {
        investor.cash += cashGained;
        investor.realEstate = investor.realEstate.filter(
          (realEstate) => realEstate.name != name
        );
      });

      await deferReply(interaction, {
        embeds: [
          buildingSold(
            interaction.user,
            config.image,
            name,
            realEstateType,
            cashGained
          ),
        ],
      });
    }
  },
} satisfies Command;
