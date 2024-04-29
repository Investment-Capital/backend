import fs from "fs";
import Event from "../../types/event";
import Handler from "../../types/handler";

export default (async (cache, client) => {
  for (const file of fs.readdirSync("src/bot/events")) {
    const event: Event = (await import(`../events/${file}`)).default;
    client[event.once ? "once" : "on"](event.event as any, (...data) =>
      event.execute(cache, ...data)
    );
  }
}) satisfies Handler;
