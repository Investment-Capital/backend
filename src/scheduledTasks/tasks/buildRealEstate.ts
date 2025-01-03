import Times from "../../classes/times";
import ScheduledTask from "../../types/scheduledTask";

export default {
  time: Times.minute * 5,
  execute: () => null,
} satisfies ScheduledTask;
