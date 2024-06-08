import Cache from "./cache";
import Execute from "./execute";

type ScheduledTask = {
  date: number | ((cache: Cache) => number);
  execute: Execute;
};

export default ScheduledTask;
