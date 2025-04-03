import Roles from "../../enum/roles";

type RolesConfig = {
  [_ in Roles]: {
    emoji: string;
    image: string;
    moderation: boolean;
  };
};

export default RolesConfig;
