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
  stocks: { type: Object, default: {} },
  admin: { type: Boolean, default: false },
});

export default model("investors", investors);
