import { Client } from "discord.js";
import Cache from "./cache";

type Handler = (cache: Cache, client: Client) => any;

export default Handler;
