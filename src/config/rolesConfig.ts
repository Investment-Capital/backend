import Emojis from "../classes/emojis";
import Images from "../classes/images";
import RolesConfig from "../types/config/rolesConfig";

const rolesConfig: RolesConfig = {
  player: {
    emoji: Emojis.worker,
    image: Images.worker,
    moderation: false,
  },
  admin: {
    emoji: Emojis.detective,
    moderation: true,
    image: Images.detective,
  },
  owner: {
    emoji: Emojis.crown,
    image: Images.crown,
    moderation: true,
  },
};

export default rolesConfig;
