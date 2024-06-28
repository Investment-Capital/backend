import fs from "fs";
import Event from "../../types/event";
import Execute from "../../types/execute";
import Cache from "../../types/cache";

export default (async (cache: Cache) => {
  for (const file of fs.readdirSync("src/bot/events")) {
    const event: Event = (await import(`../events/${file}`)).default;

    cache.client[event.once ? "once" : "on"](event.event, (...data) =>
      event.execute(cache, ...data)
    );
  }
}) satisfies Execute;
