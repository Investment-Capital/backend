import Roles from "../../../../../enum/roles";
import deferReply from "../../../../../functions/deferReply";
import editInvestor from "../../../../../functions/editInvestor";
import CommandExecute from "../../../../../types/commandExecute";
import adminEditEmbed from "../../../../responces/embeds/adminEdit";
import errorEmbed from "../../../../responces/embeds/error";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "admin"
      : false,
  allowedRoles: [Roles.owner],
  execute: async (cache, _, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const user = interaction.options.getUser("user", true);
    const subcommand = interaction.options.getSubcommand();

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

    if (foundInvestor.role == Roles.owner)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(user, "You can't edit an owners role.", "Invalid User"),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      (subcommand == "give" && foundInvestor.role == Roles.admin) ||
      (subcommand == "remove" && foundInvestor.role !== Roles.admin)
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              user,
              subcommand == "give"
                ? "This user already has admin."
                : "This user already doesn't have admin.",
              "Invalid Action"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    editInvestor(cache, foundInvestor, () => {
      foundInvestor.role = subcommand == "give" ? Roles.admin : Roles.player;
    });

    await deferReply(interaction, {
      embeds: [adminEditEmbed(interaction.user, user, foundInvestor.role)],
    });
  },
} satisfies CommandExecute;
