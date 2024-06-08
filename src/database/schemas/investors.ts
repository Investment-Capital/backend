import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";
import Blacklist from "../../types/blacklist";
import Permissions from "../../types/permissions";

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

const permissions = new Schema<Permissions>(
  {
    owner: Boolean,
    admin: Boolean,
  },
  {
    _id: false,
  }
);

const investors = new Schema<Investor>(
  {
    cash: Number,
    prestige: Number,
    created: Number,
    authorization: String,
    user,
    blacklist: { ...blacklistData.obj, history: [blacklistData] },
    permissions,
  },
  {
    versionKey: false,
  }
);

export default model("investors", investors, "investors");
