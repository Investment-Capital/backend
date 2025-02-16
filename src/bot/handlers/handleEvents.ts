import fs from "fs";
import Event from "../../types/event";
import Cache from "../../types/cache";
import path from "path";

export default async (cache: Cache) => {
  for (const file of fs.readdirSync(path.join(__dirname, `../events`))) {
    const event: Event = (await import(`../events/${file}`)).default;

    cache.client[event.once ? "once" : "on"](event.event, (...data) =>
      event.execute(cache, ...data)
    );
  }
};
