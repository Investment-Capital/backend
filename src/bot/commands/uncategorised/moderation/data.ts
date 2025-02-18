import { SlashCommandBuilder } from "discord.js";
import Command from "../../../../types/command";

export default new SlashCommandBuilder()
  .setName("moderation")
  .setDescription("Moderation commands.")
  .addSubcommandGroup((option) =>
    option
      .setName("blacklist")
      .setDescription("Edit blacklist status of an user.")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("add")
          .setDescription("Blacklist someone.")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to blacklist.")
              .setRequired(true)
          )
          .addStringOption((option) =>
            option
              .setName("reason")
              .setDescription("The reason for blacklisting them.")
              .setRequired(true)
              .setMinLength(5)
              .setMaxLength(200)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remove")
          .setDescription("Unblacklist someone.")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to blacklist.")
              .setRequired(true)
          )
          .addStringOption((option) =>
            option
              .setName("reason")
              .setDescription("The reason for unblacklisting them.")
              .setRequired(true)
              .setMinLength(5)
              .setMaxLength(200)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("history")
          .setDescription("View the blacklist history of a user.")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to view the history of.")
              .setRequired(true)
          )
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("roles")
      .setDescription("View the investors with moderation roles.")
  )
  .addSubcommandGroup((subcommandGroup) =>
    subcommandGroup
      .setName("admin")
      .setDescription("Give or remove someones admin role.")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("give")
          .setDescription("Give someone the admin role.")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to give the admin role.")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remove")
          .setDescription("Removes someones admin role.")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to remove the admin role.")
              .setRequired(true)
          )
      )
  )
  .toJSON() satisfies Command["data"];
