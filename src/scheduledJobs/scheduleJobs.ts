import Cache from "../types/cache";
import fs from "fs";
import ScheduledJob from "../types/scheduledJob";
import path from "path";
import { scheduleJob } from "node-schedule";

const schedualTasks = async (cache: Cache) => {
  for (const file of fs.readdirSync(path.join(__dirname, "./jobs"))) {
    const task: ScheduledJob = (await import(`./jobs/${file}`)).default;
    scheduleJob(task.time, () => task.execute(cache));
  }
};

export default schedualTasks;
