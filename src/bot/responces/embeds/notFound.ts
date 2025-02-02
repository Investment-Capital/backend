import { EmbedBuilder, User } from "discord.js";
import addDefaults from "./defaults/addDefaults";

const notFoundEmbed = (user: User) => {
  return addDefaults(
    new EmbedBuilder()
      .setTitle("Not Found")
      .setColor("Yellow")
      .setDescription(
        "This component or command is invalid, the developer has been notified."
      ),
    user
  );
};

export default notFoundEmbed;
