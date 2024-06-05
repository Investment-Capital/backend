import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";
import Blacklist from "../../types/blacklist";

const user = new Schema<SavedUser>(
  {
    id: String,
    displayName: String,
    username: String,
    avatar: String,
  },
  {
    _id: false,
  }
);

const blacklistData = new Schema<Omit<Blacklist, "history">>(
  {
    blacklisted: Boolean,
    reason: String || null,
    date: Number || null,
    author: String || null,
  },
  {
    _id: false,
  }
);

const investorData = new Schema<Investor>(
  {
    cash: Number,
    prestige: Number,
    created: Number,
    authorization: String,
    user: user,
    blacklist: { ...blacklistData.obj, history: [blacklistData] },
  },
  {
    _id: false,
  }
);

const investors = new Schema({
  investors: [investorData],
});

export default model("investors", investors, "investors");
