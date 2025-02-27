import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import CommandExecute from "./commandExecute";

type Command = {
  data: RESTPostAPIApplicationCommandsJSONBody[];
  category: string;
  execute: CommandExecute[];
};

export default Command;
