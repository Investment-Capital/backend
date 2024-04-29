import Execute from "./execute";

type SchedualedTask = {
  nextDate: number;
  interval: number;
  execute: Execute;
};

export default SchedualedTask;
