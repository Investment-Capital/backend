import Execute from "./execute";

type Component = {
  data: string;
  execute: Execute;
  requiresAccount?: boolean;
  guilds?: string[];
  disabled?: boolean | (() => boolean);
  requiedPrestige?: number | null;

  admin?: boolean;
  owner?: boolean;
};

export default Component;
