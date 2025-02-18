import Roles from "../../../../../enum/roles";
import deferReply from "../../../../../functions/deferReply";
import CommandExecute from "../../../../../types/commandExecute";
import blacklistHistoryEmbed from "../../../../responces/embeds/blacklistHistory";
import errorEmbed from "../../../../responces/embeds/error";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "blacklist" &&
        interaction.options.getSubcommand() == "history"
      : false,
  allowedRoles: [Roles.owner, Roles.admin],
  execute: async (cache, _, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.getUser("user", true);
    const foundInvestor = cache.investors.find(
      (investor) => investor.user.id == user.id
    );

    if (!foundInvestor)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              user,
              "This user hasn't made an account.",
              "Invalid User"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (foundInvestor.blacklist.history.length == 0)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              user,
              "This user has never been blacklisted.",
              "Invalid User"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    return await deferReply(interaction, {
      embeds: [blacklistHistoryEmbed(user, foundInvestor.blacklist.history)],
    });
  },
} satisfies CommandExecute;
