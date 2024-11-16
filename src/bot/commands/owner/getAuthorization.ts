import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  User,
} from "discord.js";
import Command from "../../../types/command";
import Cache from "../../../types/cache";
import deferReply from "../../../functions/deferReply";
import lookupInvalidAccount from "../../responces/embeds/lookupInvalidAccount";

export default {
  data: new SlashCommandBuilder()
    .setName("authorization")
    .setDescription("Get a users authorization code")
    .addUserOption((option) =>
      option
        .setRequired(true)
        .setName("user")
        .setDescription("The user to get the authorization of.")
    )
    .toJSON(),
  owner: true,
  execute: async (cache: Cache, interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("user") as User;
    const investorData = cache.investors.find(
      (investor) => investor.user.id == user?.id
    );

    if (!investorData)
      return await deferReply(
        interaction,
        { embeds: [lookupInvalidAccount(user)] },
        { ephemeral: true }
      );

    await deferReply(
      interaction,
      `Authorization: ${investorData.authorization}`,
      { ephemeral: true }
    );
  },
} satisfies Command;
