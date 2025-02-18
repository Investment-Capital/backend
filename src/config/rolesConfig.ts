import Emojis from "../classes/emojis";
import RolesConfig from "../types/config/rolesConfig";

const rolesConfig: RolesConfig = {
  player: {
    emoji: Emojis.worker,
    moderation: false,
  },
  admin: {
    emoji: Emojis.detective,
    moderation: true,
  },
  owner: {
    emoji: Emojis.crown,
    moderation: true,
  },
};

export default rolesConfig;
