import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";
import Blacklist from "../../types/blacklist";
import Permissions from "../../types/permissions";
import Stocks from "../../enum/stocks";

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

const stocks = new Schema<{ [_ in Stocks]: number }>(
  Object.values(Stocks).reduce((object: any, stock) => {
    object[stock] = Number;
    return object;
  }, {}),
  {
    _id: false,
  }
);

const realEstate = new Schema<Investor["realEstate"][number]>(
  {
    name: String,
    type: String,
    upgrades: [String],
    built: Boolean,
    created: Number,
  },
  {
    _id: false,
  }
);

const investor = new Schema<Investor>(
  {
    cash: Number,
    prestige: Number,
    created: Number,
    authorization: String,
    stocks,
    user,
    blacklist: { ...blacklistData.obj, history: [blacklistData] },
    permissions,
    realEstate: [realEstate],
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default model("investors", investor, "investors");
