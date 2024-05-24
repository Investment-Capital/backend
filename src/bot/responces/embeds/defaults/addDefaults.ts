import { EmbedBuilder, User } from "discord.js";
import setURL from "./setURL";
import setAuthor from "./setAuthor";

const addDefaults = (embed: EmbedBuilder, user: User) =>
  setAuthor(setURL(embed), user);

export default addDefaults;
