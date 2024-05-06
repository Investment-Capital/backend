import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";

const user = new Schema<SavedUser>({
  id: String,
  displayName: String || null,
  username: String,
  avatar: String,
});

const blacklistData = new Schema<Omit<Investor["blacklist"], "history">>({
  blacklisted: Boolean,
  reason: String || null,
  date: Number || null,
  author: String || null,
});

const investorData = new Schema<Investor>({
  cash: Number,
  prestige: Number,
  user: user,
  blacklist: { ...blacklistData.obj, history: [blacklistData] },
});

const investors = new Schema({
  investors: [investorData],
});

export default model("investors", investors, "investors");
