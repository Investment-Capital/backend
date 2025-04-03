import Markets from "../../enum/markets";

type MarketsConfig = {
  [_ in Markets]: {
    emoji: string;
    name: string;
    image: string;
  };
};

export default MarketsConfig;
