import { model, Schema } from "mongoose";
import LevelConfig from "../../types/levelConfig";

const levelConfig = new Schema<LevelConfig>({
  level: Number,
  xpRequired: Number,
  rewards: {
    cash: Number,
    stocks: { type: Map, of: Number },
  },
});

export default model("levelConfig", levelConfig);
