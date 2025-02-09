import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import Execute from "./execute";
import Cache from "./cache";
import RequiredPrestige from "./requiredPrestige";

type Command = {
  data: RESTPostAPIApplicationCommandsJSONBody;
  config: {
    guilds?: string[];
    category?: string;
    disabled?: boolean | ((cache: Cache) => boolean);
    requiedPrestige?: RequiredPrestige;
    admin?: boolean;
    owner?: boolean;
    requiresAccount?: boolean;
  };
  autocomplete?: Execute;
  execute: {
    validateCommand: Execute;
    execute: Execute;
  }[];
};

export default Command;
