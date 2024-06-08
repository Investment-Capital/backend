import { CommandInteraction, EmbedBuilder, Interaction } from "discord.js";

const replyWithEmbed = async (
  interaction: Interaction | CommandInteraction,
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
