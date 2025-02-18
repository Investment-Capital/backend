import Roles from "../../../../../enum/roles";
import deferReply from "../../../../../functions/deferReply";
import editInvestor from "../../../../../functions/editInvestor";
import Blacklist from "../../../../../types/blacklist";
import CommandExecute from "../../../../../types/commandExecute";
import blacklistedUserEmbed from "../../../../responces/embeds/blacklistedUser";
import errorEmbed from "../../../../responces/embeds/error";

export default {
  validateCommand: (_, interaction) =>
    interaction.isChatInputCommand()
      ? interaction.options.getSubcommandGroup() == "blacklist" &&
        (interaction.options.getSubcommand() == "remove" ||
          interaction.options.getSubcommand() == "add")
      : false,
  allowedRoles: [Roles.owner],
  execute: async (cache, _, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason", true);
    const subcommand = interaction.options.getSubcommand();

    const targetInvestor = cache.investors.find(
      (investor) => investor.user.id == user.id
    );

    if (!targetInvestor)
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

    if (targetInvestor.role == Roles.owner)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(user, "You can't blacklist owners.", "Invalid User"),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      (subcommand == "add" && targetInvestor.blacklist.blacklisted) ||
      (subcommand == "remove" && !targetInvestor.blacklist.blacklisted)
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              user,
              subcommand == "add"
                ? "This investor is already blacklisted."
                : "This investor already isn't blacklisted.",
              "Invalid Action"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    const data: Blacklist["history"][number] = {
      blacklisted: subcommand == "add",
      author: interaction.user.id,
      date: Date.now(),
      reason,
    };

    editInvestor(cache, targetInvestor, () => {
      targetInvestor.blacklist = {
        ...data,
        history: [...targetInvestor.blacklist.history, data],
      };
    });

    await deferReply(interaction, {
      embeds: [
        blacklistedUserEmbed(interaction.user, user, data.blacklisted, reason),
      ],
    });
  },
} satisfies CommandExecute;
