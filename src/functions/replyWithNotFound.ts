import { Interaction } from "discord.js";
import notFound from "../bot/responces/embeds/notFound";

const replyWithNotFound = async (interaction: Interaction) => {
  if (interaction.isAutocomplete()) return;

  if (!interaction.deferred)
    await interaction.deferReply({
      ephemeral: true,
    });

  await interaction.editReply({
    embeds: [notFound(interaction.user)],
  });
};

export default replyWithNotFound;
