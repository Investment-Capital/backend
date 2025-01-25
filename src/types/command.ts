import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import Execute from "./execute";
import Cache from "./cache";
import RequiredPrestige from "./requiredPrestige";

type Command = {
  data: RESTPostAPIApplicationCommandsJSONBody;
  validateComponent?: (
    interaction:
      | AnySelectMenuInteraction
      | ButtonInteraction
      | ModalSubmitInteraction
  ) => boolean;

  execute: Execute;
  autocomplete?: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  category?: string;
  disabled?: boolean | ((cache: Cache) => boolean);
  requiedPrestige?: RequiredPrestige;

  admin?: boolean;
  owner?: boolean;
};

export default Command;
