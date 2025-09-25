import { Spec } from "node-schedule";
import Cache from "./cache";

type ScheduledJob = {
  time: Spec;
  execute: (cache: Cache) => any;
};

export default ScheduledJob;
