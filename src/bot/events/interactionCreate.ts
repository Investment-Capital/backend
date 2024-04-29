import {
  CommandInteraction,
  Events,
  Interaction,
  MessageComponentInteraction,
} from "discord.js";
import Event from "../../types/event";
import logger from "../../classes/logger";
import replyWithError from "../../functions/replyWithError";
import replyWithNotFound from "../../functions/replyWithNotFound";
import Investor from "../../types/investor";
import Command from "../../types/command";
import Component from "../../types/component";
import Execute from "../../types/execute";

export default {
  event: Events.InteractionCreate,
  execute: async (cache, interaction: Interaction) => {
    const foundUser = cache.investors.find(
      (e) => interaction.user.id == e.user.id
    );

    if (
      (interaction as CommandInteraction).commandName !== "start" &&
      (interaction as MessageComponentInteraction).customId !== "start" &&
      !foundUser
    ) {
      console.log("user doesnt have an account");
      return;
    }

    if (foundUser?.blacklist.blacklisted) {
      console.log("user blacklisted");
      return;
    }

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
        await replyWithNotFound(interaction);
        return logger.warn(
          `Invalid Component Type: ${interaction.component.type}`
        );
      }

      executeData = componentCache.find((e) =>
        interaction.customId.startsWith(e.data)
      );
    }

    if (!executeData) {
      await replyWithNotFound(interaction);
      return logger.warn(
        `Invalid Execution: ${
          (interaction as CommandInteraction).commandName ??
          (interaction as MessageComponentInteraction).customId
        }`
      );
    }

    if (
      typeof executeData.disabled == "function"
        ? executeData.disabled()
        : executeData.disabled
    ) {
      console.log("disabled");
      return;
    }

    if (
      executeData.requiedPrestige &&
      (interaction as CommandInteraction).commandName !== "start" &&
      (interaction as MessageComponentInteraction).customId !== "start" &&
      executeData.requiedPrestige > (foundUser as Investor).prestige
    ) {
      console.log("not right pt");
      return;
    }

    try {
      if (
        interaction.isAutocomplete() &&
        (executeData as Command).autocomplete
      ) {
        await ((executeData as Command).autocomplete as Execute)(
          cache,
          interaction
        );
      } else if (!interaction.isAutocomplete())
        await executeData.execute(cache, interaction);
      else throw new Error("Invalid Interaction Type");
    } catch (error: any) {
      await replyWithError(interaction);
      logger.error("Error executing command/autocomplete", error);
    }
  },
} satisfies Event;
