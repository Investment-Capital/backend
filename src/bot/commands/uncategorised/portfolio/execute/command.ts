import {
  ActionRowBuilder,
  Interaction,
  User,
  UserSelectMenuBuilder,
} from "discord.js";
import Command from "../../../../../types/command";
import Cache from "../../../../../types/cache";
import deferReply from "../../../../../functions/deferReply";
import errorEmbed from "../../../../responces/embeds/error";
import portfolioEmbed from "../../../../responces/embeds/portfolio";
import portfolioMenu from "../../../../responces/components/menus/portfolio";

export default {
  validateCommand: (interaction: Interaction) =>
    interaction.isChatInputCommand() ||
    interaction.isContextMenuCommand() ||
    interaction.isAutocomplete()
      ? true
      : interaction.customId.startsWith("portfolio"),
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
          embeds: [
            errorEmbed(user, "This account doesn't exist.", "Invalid Account"),
          ],
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
} satisfies Command["execute"][number];
