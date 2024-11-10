import { Schema, model } from "mongoose";
import Investor from "../../types/investor";
import SavedUser from "../../types/savedUser";
import Blacklist from "../../types/blacklist";
import Permissions from "../../types/permissions";
import Stocks from "../../enum/stocks";
import defaultInvestorData from "../../config/defaultInvestorData";
import modifyUndefinedValues from "../../functions/modifyUndefinedValues";

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
  },
  {
    versionKey: false,
  }
);

investor.post("find", async (investorsData: Investor[], next) => {
  const modifiedIds: string[] = [];

  for (const investor of investorsData) {
    const defaultInvestor = defaultInvestorData(
      investor.user,
      investor.permissions,
      investor.authorization
    );

    const modified = modifyUndefinedValues(investor, defaultInvestor);
    modified && modifiedIds.push(investor.user.id);
  }

  const bulk = modifiedIds.map((userId) => ({
    updateOne: {
      filter: { "user.id": userId },
      update: {
        $set: investorsData.find(
          (investorData) => investorData.user.id == userId
        ),
      },
      upsert: true,
    },
  }));

  if (bulk.length > 0) await model("investors").bulkWrite(bulk);
  next();
});

export default model("investors", investor, "investors");
