import Execute from "./execute";

type Route = {
  path: string;
  execute: Execute;
  method: "ws" | "post" | "get";
  authorized?: boolean;
  category?: string;

  ratelimit?: number;
  ratelimitDuration?: number;
};

export default Route;
