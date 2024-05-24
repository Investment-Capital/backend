import { EmbedBuilder, User } from "discord.js";

const setAuthor = (embed: EmbedBuilder, user: User) =>
  embed.setAuthor({
    name: user.displayName ?? user.username,
    iconURL: user.displayAvatarURL(),
    url: `https://discord.com/users/${user.id}`,
  });

export default setAuthor;
