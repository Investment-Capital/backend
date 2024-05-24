import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";

const notFound = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Not Found")
      .setColor("Yellow")
      .setDescription("This component or commands is invalid"),
    user
  );
};

export default notFound;
