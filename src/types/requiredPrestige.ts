import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
} from "discord.js";

type RequiredPrestige = {
  default?: number;
  commands?: {
    subcommand: string;
    subcommandGroup: string | null;
    requiredPrestige: number;
  }[];
  components?: (
    interaction:
      | AnySelectMenuInteraction
      | ButtonInteraction
      | ModalSubmitInteraction
  ) => number | undefined;
};

export default RequiredPrestige;
