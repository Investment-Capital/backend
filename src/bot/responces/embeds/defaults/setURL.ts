import { EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const setURL = (embed: EmbedBuilder) =>
  embed.setURL(process.env.WEBSITE_URL as string);

export default setURL;
