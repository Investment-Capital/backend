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
            () => task.execute(cache).then(resolve),
            typeof task.date == "function" ? task.date() : task.date
          )
        );
      }
    })();
  }
};

export default schedualTasks;
