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

  cash: Number,
  stocks: Object,
  admin: Boolean,
  created: Number,
});

export default model("investors", investors);
