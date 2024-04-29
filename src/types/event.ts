import { Events } from "discord.js";
import Execute from "./execute";

type Event = {
  event: Events;
  once?: boolean;
  execute: Execute;
};

export default Event;
