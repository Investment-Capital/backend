import Roles from "../../../../../enum/roles";
import CommandExecute from "../../../../../types/commandExecute";

export default {
  validateCommand: () => false,
  execute: () => null,
  allowedRoles: [Roles.admin, Roles.owner],
} satisfies CommandExecute;
