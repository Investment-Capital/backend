import { AutocompleteInteraction, Interaction } from "discord.js";
import Roles from "../enum/roles";
import Investor from "./investor";
import Cache from "./cache";

type CommandExecute = {
  validateCommand: (cache: Cache, interaction: Interaction) => boolean;
  requiredPresige?: (cache: Cache, interaction: Interaction) => number;
  disabled?: boolean | ((cache: Cache) => boolean);
  guilds?: string[];
} & (
  | {
      requiresAccount?: true;
      execute: (
        cache: Cache,
        investor: Investor,
        interaction: Interaction
      ) => any;
      autocomplete?: (
        cache: Cache,
        investor: Investor,
        interaction: AutocompleteInteraction
      ) => any;
      allowedRoles?: Roles[];
    }
  | {
      requiresAccount: false;
      execute: (cache: Cache, interaction: Interaction) => any;
      autocomplete?: (
        cache: Cache,
        interaction: AutocompleteInteraction
      ) => any;
    }
);

export default CommandExecute;
