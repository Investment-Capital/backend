import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";
import Blacklist from "../../types/blacklist";
import Stocks from "../../enum/stocks";
import RealEstate from "../../types/realEstate";
import ShopItems from "../../enum/shopItems";

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

const stocks = new Schema<Investor["stocks"]>(
  Object.values(Stocks).reduce((object: any, stock) => {
    object[stock] = Number;
    return object;
  }, {}),
  {
    _id: false,
  }
);

const shop = new Schema<Investor["shop"]>(
  Object.values(ShopItems).reduce((object: any, item) => {
    object[item] = Number;
    return object;
  }, {}),
  {
    _id: false,
  }
);

const realEstateUpgrades = new Schema<RealEstate["upgrades"][number]>(
  {
    completed: Boolean,
    created: Number,
    type: String,
  },
  {
    _id: false,
  }
);

const realEstate = new Schema<RealEstate>(
  {
    name: String,
    type: String,
    upgrades: [realEstateUpgrades],
    built: Boolean,
    created: Number,
  },
  {
    _id: false,
  }
);

const cooldowns = new Schema<Investor["cooldowns"]>(
  {
    commandXp: Number,
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
    role: String,
    authorization: String,
    xp: Number,
    shop,
    cooldowns,
    stocks,
    user,
    blacklist: { ...blacklistData.obj, history: [blacklistData] },
    realEstate: [realEstate],
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default model("investors", investor, "investors");
