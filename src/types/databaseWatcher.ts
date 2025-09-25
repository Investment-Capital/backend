import { ChangeStreamDocument } from "mongodb";
import { Model } from "mongoose";
import Cache from "./cache";

type DatabaseWatcher = {
  model: Model<any>;
  execute: (cache: Cache, change: ChangeStreamDocument) => any;
};

export default DatabaseWatcher;
