import Cache from "../types/cache";
import fs from "fs";
import ScheduledTask from "../types/scheduledTask";

const schedualTasks = async (cache: Cache) => {
  for (const file of fs.readdirSync("src/scheduledTasks/tasks")) {
    const task: ScheduledTask = (await import(`./tasks/${file}`)).default;

    (async () => {
      while (true) {
        await new Promise((resolve) =>
          setTimeout(
            async () => {
              await task.execute(cache);
              resolve(null);
            },
            typeof task.time == "function" ? task.time(cache) : task.time
          )
        );
      }
    })();
  }
};

export default schedualTasks;
