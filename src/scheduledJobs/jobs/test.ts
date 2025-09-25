import ScheduledJob from "../../types/scheduledJob";

export default {
  time: { second: 0 },
  execute: () => console.log("job test, runs every minute change"),
} satisfies ScheduledJob;
