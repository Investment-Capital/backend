import {
  ActionRowBuilder,
  Interaction,
  SlashCommandBuilder,
  User,
  UserSelectMenuBuilder,
} from "discord.js";
import Command from "../../../types/command";
import Cache from "../../../types/cache";
import deferReply from "../../../functions/deferReply";
import lookupInvalidAccountEmbed from "../../responces/embeds/lookupInvalidAccount";
import portfolioEmbed from "../../responces/embeds/portfolio";
import portfolioMenu from "../../responces/components/menus/portfolio";

export default {
  data: new SlashCommandBuilder()
    .setName("portfolio")
    .setDescription("View your or another players portfolio.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to lookup.")
        .setRequired(false)
    )
    .toJSON(),
  validateComponent: (interaction) => interaction.customId == "portfolio",
  execute: async (cache: Cache, _, interaction: Interaction) => {
    const user = interaction.isChatInputCommand()
      ? interaction.options.getUser("user") ?? interaction.user
      : interaction.isUserSelectMenu()
      ? (interaction.users.get(interaction.values[0]) as User)
      : interaction.user;

    const userData = cache.investors.find(
      (investor) => investor.user.id == user.id
    );

    if (!userData)
      return await deferReply(
        interaction,
        {
          embeds: [lookupInvalidAccountEmbed(user)],
        },
        {
          ephemeral: true,
        }
      );

    await deferReply(interaction, {
      embeds: [portfolioEmbed(user, userData, user !== interaction.user)],
      components: [
        new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
          portfolioMenu(user.id)
        ),
      ],
    });
  },
} satisfies Command;
