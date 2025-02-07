import Markets from "../../enum/markets";

type MarketsConfig = {
  [_ in Markets]: {
    emoji: string;
    name: string;
  };
};

export default MarketsConfig;
