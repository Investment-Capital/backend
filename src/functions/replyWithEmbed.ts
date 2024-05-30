import { EmbedBuilder, Interaction } from "discord.js";

const replyWithEmbed = async (
  interaction: Interaction,
  embed: EmbedBuilder,
  ephemeral: boolean = false
) => {
  if (interaction.isAutocomplete()) return;

  if (!interaction.deferred)
    await interaction.deferReply({
      ephemeral,
    });

  await interaction.editReply({
    embeds: [embed],
  });
};

export default replyWithEmbed;
