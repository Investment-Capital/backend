import { Interaction } from "discord.js";
import executionError from "../bot/responces/embeds/executionError";

const replyWithError = async (interaction: Interaction) => {
  if (interaction.isAutocomplete()) return;

  if (!interaction.deferred)
    await interaction.deferReply({
      ephemeral: true,
    });

  await interaction.editReply({
    embeds: [executionError(interaction.user)],
  });
};

export default replyWithError;
