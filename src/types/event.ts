import Execute from "./execute";

type Event = {
  event: string;
  once?: boolean;
  execute: Execute;
};

export default Event;
