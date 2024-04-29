import { EmbedBuilder, User } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const addDefaults = (embed: EmbedBuilder, user: User) => {
  return embed
    .setAuthor({
      name: user.displayName ?? user.username,
      iconURL: user.displayAvatarURL(),
      url: `https://discord.com/users/${user.id}`,
    })
    .setURL(process.env.WEBSITE_URL as string);
};

export default addDefaults;
