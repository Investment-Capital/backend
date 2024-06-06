import Execute from "./execute";

type Route = {
  path: string;
  execute: Execute;
  authorised?: boolean;
};

export default Route;
