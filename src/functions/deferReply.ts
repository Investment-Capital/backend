import {
  Interaction,
  InteractionDeferReplyOptions,
  InteractionEditReplyOptions,
} from "discord.js";

const deferReply = async (
  interaction: Interaction,
  message: InteractionEditReplyOptions | string,
  options?: InteractionDeferReplyOptions
) => {
  if (interaction.isAutocomplete()) return;

  if (!interaction.deferred) await interaction.deferReply(options);
  await interaction.editReply(message);
};

export default deferReply;
