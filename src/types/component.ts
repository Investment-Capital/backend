import { Interaction } from "discord.js";
import Execute from "./execute";

type Component = {
  data: string;
  execute: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  disabled?: boolean | (() => boolean);
  requiedPrestige?: ((interaction: Interaction) => number) | number;

  admin?: boolean;
  owner?: boolean;
};

export default Component;
