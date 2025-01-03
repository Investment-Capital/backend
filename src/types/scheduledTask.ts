import Cache from "./cache";
import Execute from "./execute";

type ScheduledTask = {
  time: number | ((cache: Cache) => number);
  execute: Execute;
};

export default ScheduledTask;
