import {
  ChatInputCommandInteraction,
  CommandInteraction,
  Events,
  Interaction,
  MessageComponentInteraction,
} from "discord.js";
import Event from "../../types/event";
import Logger from "../../classes/logger";
import Command from "../../types/command";
import Component from "../../types/component";
import Execute from "../../types/execute";
import deferReply from "../../functions/deferReply";
import notFoundEmbed from "../responces/embeds/notFound";
import executionErrorEmbed from "../responces/embeds/executionError";
import Cache from "../../types/cache";
import getInteractionRequiredPrestige from "../../functions/getInteractionRequiredPrestige";
import invalidPrestige from "../responces/embeds/invalidPrestige";

export default {
  event: Events.InteractionCreate,
  execute: async (cache: Cache, interaction: Interaction) => {
    const foundUser = cache.investors.find(
      (e) => interaction.user.id == e.user.id
    );

    let executeData: Command | Component | undefined;

    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
      executeData = cache.commands.find(
        (e) => e.data.name == interaction.commandName
      );
    } else if (
      interaction.isMessageComponent() ||
      interaction.isModalSubmit()
    ) {
      let componentCache;

      if (interaction.isButton()) componentCache = cache.components.buttons;
      else if (interaction.isStringSelectMenu())
        componentCache = cache.components.stringSelectMenus;
      else if (interaction.isModalSubmit())
        componentCache = cache.components.modals;
      else if (interaction.isUserSelectMenu())
        componentCache = cache.components.userSelectMenus;
      else {
        await deferReply(
          interaction,
          { embeds: [notFoundEmbed(interaction.user)] },
          {
            ephemeral: true,
          }
        );
        return Logger.warn(
          `Invalid Component Type: ${interaction.component.type}`
        );
      }

      executeData = componentCache.find((e) =>
        interaction.customId.startsWith(e.data)
      );
    }

    if (!executeData) {
      await deferReply(
        interaction,
        { embeds: [notFoundEmbed(interaction.user)] },
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

    if (executeData.requiresAccount && !foundUser) {
      console.log("user doesnt have an account");
      return;
    }

    if (foundUser?.blacklist.blacklisted) {
      console.log("user blacklisted");
      return;
    }

    if (
      executeData.guilds &&
      (!interaction.inGuild() ||
        !executeData.guilds.includes(interaction.guildId))
    ) {
      console.log("this command isnt in this guild");
      return;
    }

    if (
      typeof executeData.disabled == "function"
        ? executeData.disabled(cache)
        : executeData.disabled
    ) {
      console.log("disabled");
      return;
    }

    if (
      (executeData.admin &&
        !foundUser?.permissions.admin &&
        !foundUser?.permissions.owner) ||
      (executeData.owner && !foundUser?.permissions.owner)
    ) {
      console.log("they dont have correct perms");
      return;
    }

    const commandRequiredPrestige = getInteractionRequiredPrestige(
      executeData,
      interaction as ChatInputCommandInteraction
    );

    if (commandRequiredPrestige > (foundUser?.prestige ?? 1)) {
      return await deferReply(
        interaction,
        {
          embeds: [invalidPrestige(interaction.user, commandRequiredPrestige)],
        },
        { ephemeral: true }
      );
    }

    try {
      if (
        interaction.isAutocomplete() &&
        (executeData as Command).autocomplete
      ) {
        executeData.requiresAccount
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
        executeData.requiresAccount
          ? await executeData.execute(cache, foundUser, interaction)
          : await executeData.execute(cache, interaction);
      else throw new Error("Invalid Interaction Type");
    } catch (error: any) {
      await deferReply(
        interaction,
        { embeds: [executionErrorEmbed(interaction.user)] },
        {
          ephemeral: true,
        }
      );

      Logger.error(error);
    }
  },
} satisfies Event;
