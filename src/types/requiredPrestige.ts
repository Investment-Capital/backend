type RequiredPrestige = {
  default: number;
  commands: {
    subcommand: string;
    subcommandGroup: string | null;
    requiredPrestige: number;
  }[];
};

export default RequiredPrestige;
