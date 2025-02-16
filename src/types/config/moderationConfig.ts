import ModerationTypes from "../../enum/moderationTypes";

type ModerationConfig = {
  [_ in ModerationTypes]: {};
};

export default ModerationConfig;
