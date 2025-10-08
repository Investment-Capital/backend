import { model, Schema } from "mongoose";
import Investor from "../../types/investor";

const investors = new Schema<Investor>({
  account: {
    infomation: {
      password: String,
      authorization: String,
    },
    profile: {
      username: String,
      id: String,
    },
  },
  created: Number,

  cash: { type: Number, default: 1_000 },
  prestige: { type: Number, default: 1 },
  stocks: { type: Map, of: Number, default: new Map() },
  admin: { type: Boolean, default: false },
});

export default model("investors", investors);
