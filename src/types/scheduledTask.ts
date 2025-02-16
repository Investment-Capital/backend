import Cache from "./cache";

type ScheduledTask = {
  time: number | ((cache: Cache) => number);
  execute: (cache: Cache) => any;
};

export default ScheduledTask;
