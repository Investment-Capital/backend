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
import Command from "../../types/command";
import Execute from "../../types/execute";
import deferReply from "../../functions/deferReply";
import Cache from "../../types/cache";
import getInteractionRequiredPrestige from "../../functions/getInteractionRequiredPrestige";
import startButton from "../responces/components/buttons/start";
import errorEmbed from "../responces/embeds/error";
import MarkdownManager from "../../classes/markdownManager";
import warnEmbed from "../responces/embeds/warning";
import CustomIdManager from "../../classes/customIdManager";

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
      interaction.isCommand() ||
      interaction.isAutocomplete() ||
      interaction.isChatInputCommand()
        ? command.data.name == interaction.commandName
        : command.execute.some((data) =>
            data.validateCommand(cache, interaction)
          )
    );

    const commandExecute = executeData?.execute.find((data) =>
      data.validateCommand(cache, interaction)
    );

    if (
      !executeData ||
      (interaction.isAutocomplete() ? false : !commandExecute)
    ) {
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

    if (executeData.config.requiresAccount && !foundUser) {
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

    if (foundUser?.blacklist.blacklisted)
      return await deferReply(
        interaction,
        {
          embeds: [
            errorEmbed(
              interaction.user,
              `You have been blacklisted. Reason: ${foundUser.blacklist.reason}.`,
              "Blacklisted"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      executeData.config.guilds &&
      (!interaction.inGuild() ||
        !executeData.config.guilds.includes(interaction.guildId))
    )
      return await deferReply(
        interaction,
        {
          embeds: [
            warnEmbed(
              interaction.user,
              `This command isn't available in this guild.`,
              "Invalid Guild"
            ),
          ],
        },
        {
          ephemeral: true,
        }
      );

    if (
      typeof executeData.config.disabled == "function"
        ? executeData.config.disabled(cache)
        : executeData.config.disabled
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
      (executeData.config.admin &&
        !foundUser?.permissions.admin &&
        !foundUser?.permissions.owner) ||
      (executeData.config.owner && !foundUser?.permissions.owner)
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

    const commandRequiredPrestige = getInteractionRequiredPrestige(
      executeData,
      interaction,
      cache
    );

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
      if (interaction.isAutocomplete() && executeData.autocomplete) {
        executeData.config.requiresAccount
          ? await ((executeData as Command).autocomplete as Execute)(
              cache,
              foundUser,
              interaction
            )
          : await ((executeData as Command).autocomplete as Execute)(
              cache,
              interaction
            );
      } else if (!interaction.isAutocomplete())
        executeData.config.requiresAccount
          ? await commandExecute?.execute(cache, foundUser, interaction)
          : await commandExecute?.execute(cache, interaction);
      else throw new Error("Invalid Interaction Type");
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
