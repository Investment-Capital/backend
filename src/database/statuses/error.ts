import { Error } from "mongoose";
import DatabaseStatus from "../../types/databaseStatus";

export default {
  status: "error",
  execute: (error: Error) => {
    throw new Error(error.stack as string);
  },
} as DatabaseStatus;
