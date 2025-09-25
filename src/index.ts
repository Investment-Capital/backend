import startApi from "./api/startApi";
import Cache from "./types/cache";
import startDatabase from "./database/startDatabase";
import EventEmitter from "events";
import scheduleJobs from "./scheduledJobs/scheduleJobs";

(async () => {
  const cache: Cache = {
    events: new EventEmitter(),
  };

  await startDatabase(cache);

  startApi(cache);
  scheduleJobs(cache);
})();
