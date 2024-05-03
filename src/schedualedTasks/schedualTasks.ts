import Cache from "../types/cache";
import SchedualedTask from "../types/schedualedTask";
import fs from "fs";

const schedualTasks = async (cache: Cache) => {
  for (const file of fs.readdirSync("src/schedualedTasks/tasks")) {
    const task: SchedualedTask = (await import(`./tasks/${file}`)).default;

    while (true) {
      await new Promise((resolve) =>
        setTimeout(
          async () => {
            await task.execute(cache);
            resolve(null);
          },
          typeof task.date == "function" ? task.date() : task.date
        )
      );
    }
  }
};

export default schedualTasks;
