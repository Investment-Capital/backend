import Execute from "./execute";

type SchedualedTask = {
  date: number | (() => number);
  execute: Execute;
};

export default SchedualedTask;
