import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import Cache from "./cache";

type RequiredPrestige = {
  default?: number;
  commands?: {
    subcommand: string;
    subcommandGroup: string | null;
    requiredPrestige: number;
  }[];
  components?: (
    cache: Cache,
    interaction:
      | AnySelectMenuInteraction
      | ButtonInteraction
      | ModalSubmitInteraction
  ) => number | undefined;
};

export default RequiredPrestige;
