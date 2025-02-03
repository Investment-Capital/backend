import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../../types/command";
import RealEstate from "../../../enum/realEstate";
import Investor from "../../../types/investor";
import searchItems from "../../../functions/searchItems";
import realEstateConfig from "../../../config/realEstateConfig";
import editInvestor from "../../../functions/editInvestor";
import Cache from "../../../types/cache";
import deferReply from "../../../functions/deferReply";
import buildingSoldEmbed from "../../responces/embeds/buildingSold";
import notEnoughCashEmbed from "../../responces/embeds/notEnoughCash";
import nameAlreadyUsedEmbed from "../../responces/embeds/nameAlreadyUsed";
import createRealEstate from "../../../functions/createRealEstate";
import buildingStartedConstructionEmbed from "../../responces/embeds/buildingStartedConstruction";
import invalidInvestmentEmbed from "../../responces/embeds/invalidInvestment";
import MarketGraphTimes from "../../../enum/marketGraphTimes";
import RealEstateUpgrades from "../../../enum/realEstateUpgrades";
import realEstateUpgradesConfig from "../../../config/realEstateUpgradesConfig";

export default {
  data: new SlashCommandBuilder()
    .setName("realestate")
    .setDescription("Manage Real Estate.")
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("sell").setDescription("Sell real estate.");

      Object.values(RealEstate).map((realEstate) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstate)
            .setDescription(`Sell a ${realEstate}.`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the ${realEstate} you want to sell.`
                )
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("build").setDescription("Build real estate.");

      Object.values(RealEstate).map((realEstate) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstate)
            .setDescription(`Build a ${realEstate}.`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the ${realEstate} you want to build.`
                )
                .setRequired(true)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommandGroup((subcommandGroup) => {
      subcommandGroup.setName("upgrade").setDescription("Upgrade real estate.");

      Object.values(RealEstateUpgrades).map((realEstateUpgrade) =>
        subcommandGroup.addSubcommand((subcommand) =>
          subcommand
            .setName(realEstateUpgrade)
            .setDescription(`Upgrade real estate with ${realEstateUpgrade}.`)
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription(
                  `The name of the real estate you want to upgrade with ${realEstateUpgrade}.`
                )
                .setRequired(true)
            )
        )
      );

      return subcommandGroup;
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("market")
        .setDescription("View the real estate market.")
        .addStringOption((option) =>
          option
            .setName("graph-length")
            .setDescription("Change the graph duration")
            .addChoices(
              ...Object.values(MarketGraphTimes).map((name) => ({
                name,
                value: name,
              }))
            )
        )
    )
    .toJSON(),

  autocomplete: (
    _,
    investor: Investor,
    interaction: AutocompleteInteraction
  ) => {
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const search = interaction.options.getFocused();

    if (subcommandGroup == "sell") {
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
    const subcommand = interaction.options.getSubcommand();

    if (subcomamndGroup == "upgrade")
      return await deferReply(interaction, {
        content: "Coming soon!",
      });

    if (subcommand == "market") {
      const timePeriod = (interaction.options.getString("graph-length") ??
        Object.keys(MarketGraphTimes)[0]) as MarketGraphTimes;

      await deferReply(interaction, {
        content: cache.marketGraphs.realEstate[timePeriod],
      });
    } else {
      const realEstateType = subcommand as RealEstate;
      const name = interaction.options.getString("name", true);
      const config = realEstateConfig[realEstateType];
      const price = cache.markets.realEstate[realEstateType].price;

      if (subcomamndGroup == "sell") {
        const realEstate = investor.realEstate.filter(
          (realEstate) =>
            realEstate.type == realEstateType && realEstate.name == name
        );

        if (!realEstate)
          return await deferReply(
            interaction,
            {
              embeds: [invalidInvestmentEmbed(interaction.user)],
            },
            {
              ephemeral: true,
            }
          );

        editInvestor(cache, investor, (investor) => {
          investor.cash += price;
          investor.realEstate = investor.realEstate.filter(
            (realEstate) => realEstate.name != name
          );
        });

        await deferReply(interaction, {
          embeds: [
            buildingSoldEmbed(
              interaction.user,
              config.image,
              name,
              realEstateType,
              price
            ),
          ],
        });
      } else if (subcomamndGroup == "build") {
        if (price > investor.cash)
          return await deferReply(
            interaction,
            {
              embeds: [notEnoughCashEmbed(interaction.user)],
            },
            { ephemeral: true }
          );

        if (investor.realEstate.find((realEstate) => realEstate.name == name))
          return await deferReply(
            interaction,
            {
              embeds: [nameAlreadyUsedEmbed(interaction.user)],
            },
            { ephemeral: true }
          );

        editInvestor(cache, investor, () => (investor.cash -= price));
        const realEstate = createRealEstate(
          cache,
          investor,
          name,
          realEstateType
        );

        await deferReply(interaction, {
          embeds: [
            buildingStartedConstructionEmbed(
              interaction.user,
              config.image,
              config.buildTime + realEstate.created,
              price
            ),
          ],
        });
      }
    }
  },

  requiedPrestige: {
    commands: [
      ...Object.values(RealEstate).flatMap((realEstate) => {
        const config = realEstateConfig[realEstate];

        return ["build", "sell"].map((subcommandGroup) => ({
          requiredPrestige: config.requiredPrestige,
          subcommand: realEstate,
          subcommandGroup: subcommandGroup,
        }));
      }),
      ...Object.values(RealEstateUpgrades).map((realEstateUpgrade) => {
        const config = realEstateUpgradesConfig[realEstateUpgrade];

        return {
          requiredPrestige: config.requiredPrestige,
          subcommand: realEstateUpgrade,
          subcommandGroup: "upgrade",
        };
      }),
    ],

    default: Math.min(
      ...Object.values(realEstateConfig).map(
        (config) => config.requiredPrestige
      )
    ),
  },
} satisfies Command;
