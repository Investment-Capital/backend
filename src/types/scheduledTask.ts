import Execute from "./execute";

type ScheduledTask = {
  date: number | (() => number);
  execute: Execute;
};

export default ScheduledTask;
