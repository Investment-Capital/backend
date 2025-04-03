import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  Events,
  Interaction,
  MessageComponentInteraction,
} from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";
import deferReply from "../../functions/deferReply";
import Cache from "../../types/cache";
import startButton from "../responces/components/buttons/start";
import errorEmbed from "../responces/embeds/error";
import MarkdownManager from "../../classes/markdownManager";
import warnEmbed from "../responces/embeds/warning";
import CustomIdManager from "../../classes/customIdManager";
import Investor from "../../types/investor";
import moderationRolesButton from "../responces/components/buttons/moderationRoles";
import giveInvestorXp from "../../functions/giveInvestorXp";
import editInvestor from "../../functions/editInvestor";
import cooldowns from "../../config/cooldowns";

export default {
  event: Events.InteractionCreate,
  execute: async (cache: Cache, interaction: Interaction) => {
    const parsedCustomId =
      "customId" in interaction
        ? CustomIdManager.parse(cache, interaction.customId)
        : null;

    if (!parsedCustomId && "customId" in interaction) {
      return await deferReply(
        interaction,
        {
          embeds: [
            warnEmbed(
              interaction.user,
              "This component is now invalid due to a bot restart, please use a command.",
              "Invalid Component"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );
    }

    const foundUser = cache.investors.find(
      (investor) => interaction.user.id == investor.user.id
    );

    const executeData = cache.commands.find((command) =>
      interaction.isCommand() || interaction.isAutocomplete()
        ? command.data.find((data) => data.name == interaction.commandName)
        : command.execute.some((data) =>
            data.validateCommand(cache, interaction)
          )
    );

    const commandExecute = executeData?.execute.find((data) =>
      data.validateCommand(cache, interaction)
    );

    if (!executeData || !commandExecute) {
      await deferReply(
        interaction,
        {
          embeds: [
            warnEmbed(
              interaction.user,
              "This command or component can't be found. The developer has been notified.",
              "Invalid Command"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );
      return Logger.warn(
        `Invalid Execution: ${
          (interaction as CommandInteraction).commandName ??
          (interaction as MessageComponentInteraction).customId
        }`
      );
    }

    if (commandExecute.requiresAccount && !foundUser) {
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `Please create an account with ${MarkdownManager.slashCommand(
                "/start",
                cache.client.application?.commands.cache
                  .toJSON()
                  .find((command) => command.name == "start")
              )} to use this command.`,
              "Invalid Account"
            ),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              startButton(cache)
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );
    }

    if (foundUser?.blacklist.blacklisted && !commandExecute.bypassBlacklist)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You have been blacklisted, please contact anyone with a moderation role to appeal.\nReason: ${foundUser.blacklist.reason}.`,
              "Blacklisted"
            ),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              moderationRolesButton(cache)
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      typeof commandExecute.disabled == "function"
        ? commandExecute.disabled(cache)
        : commandExecute.disabled
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            warnEmbed(
              interaction.user,
              `This command has been disabled.`,
              "Command Disabled"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      parsedCustomId &&
      parsedCustomId.user &&
      parsedCustomId.user !== interaction.user.id
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `Only ${MarkdownManager.user(
                parsedCustomId.lockedUserId
              )} has access to this interaction.`,
              "Invalid Interaction"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      commandExecute && "allowedRoles" in commandExecute
        ? !foundUser || !commandExecute.allowedRoles?.includes(foundUser.role)
        : false
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              "You don't have permission to use this command.",
              "Invalid Permissions"
            ),
          ],
        },
        { ephemeral: true }
      );

    const commandRequiredPrestige =
      "requiredPresige" in commandExecute && commandExecute.requiredPresige
        ? typeof commandExecute.requiredPresige == "function"
          ? commandExecute.requiredPresige(cache, interaction)
          : commandExecute.requiredPresige
        : 1;

    if (commandRequiredPrestige > (foundUser?.prestige ?? 1)) {
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You need to be prestige ${commandRequiredPrestige} to use this command.`,
              "Invalid Prestige"
            ),
          ],
        },
        { ephemeral: true }
      );
    }

    try {
      if (interaction.isAutocomplete() && commandExecute.autocomplete) {
        commandExecute.requiresAccount
          ? await commandExecute.autocomplete(
              cache,
              foundUser as Investor,
              interaction
            )
          : await (commandExecute as any).autocomplete(cache, interaction);
      } else if (!interaction.isAutocomplete()) {
        if (foundUser && foundUser.cooldowns.commandXp < Date.now()) {
          giveInvestorXp(cache, foundUser, 1);
          editInvestor(
            cache,
            foundUser,
            () =>
              (foundUser.cooldowns.commandXp = Date.now() + cooldowns.commandXp)
          );
        }
        commandExecute.requiresAccount
          ? await commandExecute.execute(
              cache,
              foundUser as Investor,
              interaction
            )
          : await (commandExecute as any).execute(cache, interaction);
      } else throw new Error("Invalid Interaction Type");
    } catch (error: any) {
      await deferReply(
        interaction,
        {
          embeds: [
            warnEmbed(
              interaction.user,
              "An error has occured while executing this interaction, the developer has automatically been notified.",
              "An Error Has Occured"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

      Logger.error(error);
    }
  },
} satisfies Event;
