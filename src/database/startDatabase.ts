import { connect, connection } from "mongoose";
import fs from "fs";
import path from "path";
import DatabaseEvent from "../types/databaseEvent";
import { config } from "dotenv";
import Cache from "../types/cache";
import DatabaseWatcher from "../types/databaseWatcher";
config();

const startDatabase = async (cache: Cache) => {
  for (const file of fs.readdirSync(path.join(__dirname, "./events"))) {
    const event: DatabaseEvent = (await import(`./events/${file}`)).default;
    connection.on(event.event, (...data: any[]) => event.execute(...data));
  }

  await connect(process.env.MONGODB_CONNECTION_STRING as string, {
    dbName: process.env.DATABASE_NAME,
  });

  for (const file of fs.readdirSync(path.join(__dirname, "./watchers"))) {
    const watcher: DatabaseWatcher = (await import(`./watchers/${file}`))
      .default;

    connection.db?.command({
      collMod: watcher.model.collection.name,
      changeStreamPreAndPostImages: { enabled: true },
    });

    watcher.model
      .watch(
        [
          {
            $project: {
              "fullDocument._id": 0,
              "fullDocument.__v": 0,
            },
          },
        ],
        {
          fullDocument: "required",
        }
      )
      .on("change", (change) => watcher.execute(cache, change));
  }
};

export default startDatabase;
