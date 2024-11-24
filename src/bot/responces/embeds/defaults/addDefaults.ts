import { EmbedBuilder, User } from "discord.js";
import setURL from "./setURL";
import setAuthor from "./setAuthor";
import setFooter from "./setFooter";

const addDefaults = (embed: EmbedBuilder, user: User) =>
  setAuthor(setURL(setFooter(embed)), user);

export default addDefaults;
