import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import CustomIdManager from "../../../../../classes/customIdManager";
import RealEstateUpgrades from "../../../../../enum/realEstateUpgrades";
import realEstateUpgradesConfig from "../../../../../config/realEstateUpgradesConfig";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import realEstateConfig from "../../../../../config/realEstateConfig";
import MarkdownManager from "../../../../../classes/markdownManager";
import DateFormats from "../../../../../enum/dateFormats";
import editInvestor from "../../../../../functions/editInvestor";
import realEstateUpgradeBoughtEmbed from "../../../../responces/embeds/realEstateUpgradeBought";
import realEstateViewButton from "../../../../responces/components/buttons/realEstateView";
import marketButton from "../../../../responces/components/buttons/market";
import Markets from "../../../../../enum/markets";
import searchItems from "../../../../../functions/searchItems";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: (cache, interaction) =>
    interaction.isChatInputCommand() || interaction.isAutocomplete()
      ? interaction.options.getSubcommandGroup() == "upgrade"
      : interaction.isButton()
      ? CustomIdManager.parse(cache, interaction.customId).id ==
        "realEstateUpgrade"
      : false,

  requiredPresige: (cache, interaction) =>
    interaction.isChatInputCommand() || interaction.isButton()
      ? realEstateUpgradesConfig[
          (interaction.isButton()
            ? CustomIdManager.parse(cache, interaction.customId).upgrade
            : interaction.options.getSubcommand()) as RealEstateUpgrades
        ].requiredPrestige
      : 1,

  autocomplete: async (_, investor, interaction) => {
    const upgrade = interaction.options.getSubcommand() as RealEstateUpgrades;

    await interaction.respond(
      searchItems(
        interaction.options.getFocused(),
        investor.realEstate.filter(
          (realEstate) =>
            realEstate.built &&
            realEstateUpgradesConfig[upgrade].allowedRealEstate.includes(
              realEstate.type
            ) &&
            !realEstate.upgrades.find(
              (upgradeData) => upgradeData.type == upgrade
            )
        ),
        (realEstate) => realEstate.name
      ).map((realEstate) => ({
        name: realEstateConfig[realEstate.type].emoji + " " + realEstate.name,
        value: realEstate.name,
      }))
    );
  },

  execute: async (cache, investor, interaction) => {
    if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

    const upgrade: RealEstateUpgrades = interaction.isChatInputCommand()
      ? interaction.options.getSubcommand()
      : CustomIdManager.parse(cache, interaction.customId).upgrade;
    const name: string = interaction.isChatInputCommand()
      ? interaction.options.getString("name", true)
      : CustomIdManager.parse(cache, interaction.customId).name;
    const config = realEstateUpgradesConfig[upgrade];

    const realEstate = investor.realEstate.find(
      (realEstate) => realEstate.name == name
    );

    if (!realEstate)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't own real estate with this name.",
              "Invalid Real Estate"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (!config.allowedRealEstate.includes(realEstate.type))
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "This upgrade doesn't exist on this type of real estate",
              "Invalid Upgrade"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (!realEstate.built)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You can't upgrade real estate before its built.\nTry again ${MarkdownManager.date(
                realEstateConfig[realEstate.type].buildTime +
                  realEstate.created,
                DateFormats.relative
              )}.`,
              "Invalid Real Estate"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      realEstate.upgrades.find(
        (realEstateUpgrade) => realEstateUpgrade.type == upgrade
      )
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "This real estate already has this upgrade.",
              "Already Upgraded"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (investor.cash < config.price)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have enough cash for this upgrade.",
              "Not Enough Cash"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    editInvestor(cache, investor, () => {
      investor.cash -= config.price;
      realEstate.upgrades.push({
        type: upgrade,
        created: Date.now(),
        completed: false,
      });
    });

    await deferReply(interaction, {
      embeds: [
        realEstateUpgradeBoughtEmbed(
          interaction.user,
          upgrade,
          name,
          Date.now() + config.upgradeTime
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          realEstateViewButton(cache),
          marketButton(cache, Markets.realEstate)
        ),
      ],
    });
  },
} satisfies CommandExecute;
