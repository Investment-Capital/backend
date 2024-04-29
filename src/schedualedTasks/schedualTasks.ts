import Cache from "../types/cache";
import SchedualedTask from "../types/schedualedTask";
import fs from "fs";

const schedualTasks = async (cache: Cache) => {
  for (const file of fs.readdirSync("src/schedualedTasks/tasks")) {
    const task: SchedualedTask = (await import(`./tasks/${file}`)).default;

    setTimeout(() => {
      task.execute(cache);
      setInterval(() => task.execute(cache), task.interval);
    }, task.nextDate);
  }
};

export default schedualTasks;
