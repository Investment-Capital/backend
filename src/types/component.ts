import Execute from "./execute";

type Component = {
  data: string;
  execute: Execute;
  disabled: boolean | (() => boolean);
  requiedPrestige: number | null;
  requiresAccount: boolean;
  guilds?: string[];
};

export default Component;
