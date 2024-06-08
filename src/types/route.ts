import Execute from "./execute";

type Route = {
  path: string;
  execute: Execute;
  authorized?: boolean;
};

export default Route;
