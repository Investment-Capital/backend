import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import Execute from "./execute";
import Cache from "./cache";

type Command = {
  data: RESTPostAPIApplicationCommandsJSONBody;

  execute: Execute;
  autocomplete?: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  category?: string;
  disabled?: boolean | ((cache: Cache) => boolean);
  requiedPrestige?: number;

  admin?: boolean;
  owner?: boolean;
};

export default Command;
